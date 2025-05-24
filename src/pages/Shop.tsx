import { useState, useEffect } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { ShoppingCart as CartIcon, Heart, Search, Filter, Star, Check, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import ShoppingCartComponent from '@/components/ShoppingCart';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51J...'); // Replace with your Stripe public key

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  image: string;
  specifications: { [key: string]: string };
  reviews: { user: string; rating: number; comment: string }[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  cost: number;
  estimatedDays: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: string;
  trackingNumber?: string;
  deliveryMethod: string;
}

const CheckoutForm = ({ cartItems, deliveryOption, onSuccess }: { cartItems: CartItem[], deliveryOption: DeliveryOption, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      // Calculate total with delivery cost
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * 0.18; // 18% GST
      const total = subtotal + tax + deliveryOption.cost;

      // Create payment intent on the server (mock API call)
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(total * 100) }), // Stripe expects amount in cents
      });
      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement! },
      });

      if (error) {
        toast({ title: "Payment failed", description: error.message, variant: "destructive" });
      } else if (paymentIntent.status === 'succeeded') {
        toast({ title: "Payment successful!", description: "Your order has been placed." });
        onSuccess();
      }
    } catch (err) {
      toast({ title: "Error", description: "An error occurred during payment.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      <Button type="submit" disabled={!stripe || loading} className="w-full bg-techknot-blue hover:bg-techknot-purple">
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
};

const Shop = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<string>('');
  const [sortOption, setSortOption] = useState('default');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>({ id: 'standard', name: 'Standard Delivery', cost: 50, estimatedDays: '5-7 days' });
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Sample IoT components for sale with specifications and reviews
  const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Arduino Uno R3 Microcontroller',
      description: 'The Arduino Uno is a microcontroller board based on the ATmega328P. Perfect for beginners and advanced projects.',
      price: 699,
      category: 'Microcontrollers',
      rating: 4.8,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      specifications: { 'Microcontroller': 'ATmega328P', 'Operating Voltage': '5V', 'Digital I/O Pins': '14' },
      reviews: [{ user: 'John', rating: 5, comment: 'Great for beginners!' }],
    },
    // ... (Other products with specifications and reviews, omitted for brevity)
  ];

  const deliveryOptions: DeliveryOption[] = [
    { id: 'standard', name: 'Standard Delivery', cost: 50, estimatedDays: '5-7 days' },
    { id: 'express', name: 'Express Delivery', cost: 150, estimatedDays: '1-2 days' },
  ];

  useEffect(() => {
    // Initialize products
    setProducts(initialProducts);

    // Mock user authentication
    const mockUser = { id: 'user1', email: 'user@example.com' };
    setUser(mockUser);

    // Load orders from localStorage or API
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const applyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(0.1); // 10% discount
      toast({ title: "Discount applied", description: "10% discount has been applied." });
    } else {
      setDiscount(0);
      toast({ title: "Invalid code", description: "The discount code is invalid.", variant: "destructive" });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const minPriceValue = minPrice !== '' ? parseInt(minPrice) : 0;
    const maxPriceValue = maxPrice !== '' ? parseInt(maxPrice) : Infinity;
    const matchesPrice = product.price >= minPriceValue && product.price <= maxPriceValue;
    const minRatingValue = minRating !== '' ? parseInt(minRating) : 0;
    const matchesRating = product.rating >= minRatingValue;
    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'rating-desc') return b.rating - a.rating;
    return 0;
  });

  const addToCart = (product: Product) => {
    if (product.stock === 0) {
      toast({ title: "Out of stock", description: `${product.name} is currently out of stock.`, variant: "destructive" });
      return;
    }
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [
          ...prevItems, 
          { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }
        ];
      }
    });
    toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
    setIsCartOpen(true);
  };

  const updateItemQuantity = (id: number, newQuantity: number) => {
    const product = products.find(p => p.id === id);
    if (product && newQuantity > product.stock) {
      toast({ title: "Stock limit", description: `Only ${product.stock} items available.`, variant: "destructive" });
      return;
    }
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({ title: "Item removed", description: "The item has been removed from your cart." });
  };

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({ title: "Removed from wishlist", description: "Item has been removed from your wishlist." });
    } else {
      setWishlist([...wishlist, productId]);
      toast({ title: "Added to wishlist", description: "Item has been added to your wishlist." });
    }
  };

  const handleCheckoutSuccess = () => {
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryOption.cost,
      status: 'Processing',
      deliveryMethod: deliveryOption.name,
    };
    setOrders(prev => [...prev, order]);
    localStorage.setItem('orders', JSON.stringify([...orders, order]));
    setCartItems([]);
    setProducts(prev => prev.map(p => ({
      ...p,
      stock: cartItems.find(item => item.id === p.id) ? p.stock - cartItems.find(item => item.id === p.id)!.quantity : p.stock
    })));
    setIsCartOpen(false);
  };

  const addReview = (productId: number, rating: number, comment: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, reviews: [...p.reviews, { user: user?.email || 'Guest', rating, comment }] } 
        : p
    ));
    toast({ title: "Review submitted", description: "Thank you for your feedback!" });
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-techknot-ivory min-h-screen">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-techknot-purple mb-4">IoT Components Shop</h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Explore our extensive collection of high-quality IoT components for all your projects and educational needs.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Button 
                  onClick={() => setIsCartOpen(true)}
                  className="bg-techknot-blue hover:bg-techknot-purple flex items-center gap-2"
                >
                  <CartIcon size={18} />
                  Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </Button>
                {user ? (
                  <Button variant="outline">Welcome, {user.email}</Button>
                ) : (
                  <Button variant="outline" onClick={() => setUser({ id: 'user1', email: 'user@example.com' })}>
                    Login
                  </Button>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Filter size={18} className="mr-2 text-techknot-blue" /> Categories
                </h3>
                <div className="space-y-2">
                  {['All', 'Microcontrollers', 'Sensors', 'Actuators', 'Communication', 'Accessories', 'Kits'].map(category => (
                    <button
                      key={category}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        activeCategory === category ? 'bg-techknot-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Search size={18} className="mr-2 text-techknot-blue" /> Search
                </h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-techknot-blue"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-techknot-blue"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-techknot-blue"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
                <input 
                  type="number" 
                  placeholder="Min Rating (1-5)" 
                  min="1" 
                  max="5"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-techknot-blue"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                />
              </div>

              <Button 
                className="w-full bg-techknot-blue hover:bg-techknot-purple"
                onClick={() => toast({ title: "Filters applied", description: "Filters have been applied to your search." })}
              >
                Apply Filters
              </Button>
            </div>

            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Products ({filteredProducts.length})</h2>
                <select 
                  className="border rounded-md p-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <RevealOnScroll key={product.id} delay={index * 100}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 group">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button 
                          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart 
                            size={18} 
                            className={wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"} 
                          />
                        </button>
                        {product.stock < 20 && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-0.5 text-xs font-medium rounded">
                            {product.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center mr-2">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({product.rating})</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="mb-2">
                          <h4 className="text-sm font-semibold">Specifications:</h4>
                          <ul className="text-sm text-gray-600 list-disc pl-4">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <li key={key}>{key}: {value}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-techknot-purple">₹{product.price}</span>
                          <Button 
                            className="bg-techknot-blue hover:bg-techknot-purple flex items-center gap-1"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                          >
                            <CartIcon size={16} /> Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-lg text-gray-600">No products found.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border p-4 rounded-md">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Total: ₹{order.total}</p>
                    <p className="text-sm text-gray-600">Delivery: {order.deliveryMethod}</p>
                    {order.trackingNumber && (
                      <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => toast({ title: "Tracking", description: `Tracking info for ${order.id}` })}
                    >
                      Track Order
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ShoppingCartComponent 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateItemQuantity={updateItemQuantity}
        removeItem={removeItem}
      >
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Options</h3>
          <div className="space-y-2">
            {deliveryOptions.map(option => (
              <div key={option.id} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  id={option.id} 
                  name="delivery" 
                  checked={deliveryOption.id === option.id}
                  onChange={() => setDeliveryOption(option)}
                />
                <label htmlFor={option.id}>
                  {option.name} (₹{option.cost}, {option.estimatedDays})
                </label>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Discount Code</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter code" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button onClick={applyDiscount}>Apply</Button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18% GST)</span>
                <span>₹{(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₹{deliveryOption.cost}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * discount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{(
                  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * (1 - discount) +
                  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18 +
                  deliveryOption.cost
                ).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm cartItems={cartItems} deliveryOption={deliveryOption} onSuccess={handleCheckoutSuccess} />
          </Elements>
        </div>
      </ShoppingCartComponent>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Shop;
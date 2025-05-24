
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Trash2, ShoppingCart as CartIcon, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateItemQuantity: (id: number, newQuantity: number) => void;
  removeItem: (id: number) => void;
}

const ShoppingCart = ({ isOpen, onClose, cartItems, updateItemQuantity, removeItem }: ShoppingCartProps) => {
  const { toast } = useToast();
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 100; // Fixed shipping cost of ₹100
  
  useEffect(() => {
    // Calculate subtotal whenever cart items change
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cartItems]);

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment gateway...",
    });
    
    // In a real app, this would redirect to a payment gateway
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: "Your order has been placed successfully.",
      });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-auto animate-fade-in animate-enter">
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center">
            <CartIcon size={20} className="mr-2" />
            Your Cart ({cartItems.length})
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <CartIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Looks like you haven't added any items to your cart yet.</p>
            <Button 
              onClick={onClose}
              className="bg-techknot-blue hover:bg-techknot-purple"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="divide-y p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="pt-4 first:pt-0">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-techknot-purple font-bold">₹{item.price}</p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <button 
                            className="px-2 py-1 hover:bg-gray-100"
                            onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 hover:bg-gray-100"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 mt-auto sticky bottom-0">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>₹{shippingCost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹{Math.round(subtotal * 0.18)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{subtotal + shippingCost + Math.round(subtotal * 0.18)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full bg-techknot-blue hover:bg-techknot-purple flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                Checkout Now
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;

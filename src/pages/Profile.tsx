
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ShoppingCart, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock user courses data
const userCourses = [
  {
    id: 1,
    title: "Introduction to IoT",
    progress: 75,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    lastAccessed: "2025-05-10T14:30:00Z",
    instructor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    title: "Advanced Arduino Programming",
    progress: 45,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    lastAccessed: "2025-05-08T10:15:00Z",
    instructor: "Prof. Michael Chen",
  },
];

// Mock cart data
const userCart = [
  {
    id: 1,
    name: "Arduino Uno R3 Microcontroller",
    price: 699,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: 5,
    name: "NodeMCU ESP8266 WiFi Module",
    price: 399,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
];

const Profile = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(date);
  };

  const continueCourse = (courseId: number) => {
    navigate(`/lms?course=${courseId}`);
    toast({
      title: "Course resumed",
      description: "Navigating to your course content",
    });
  };

  const removeCourse = (courseId: number) => {
    toast({
      title: "Course removed",
      description: "The course has been removed from your dashboard",
    });
  };

  const removeFromCart = (itemId: number) => {
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  const checkout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to payment page",
    });
    navigate("/shop");
  };
  
  const totalCartValue = userCart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <>
      <Navbar />
      <div className="pt-28 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-techknot-blue">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                  <AvatarFallback className="text-xl">
                    {getInitials(user.fullName || user.username || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold">{user.fullName}</h1>
                  <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => navigate("/user/settings")}
                >
                  <Settings size={16} />
                  Account Settings
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="bg-white rounded-lg shadow-md"
          >
            <TabsList className="w-full border-b border-gray-200 rounded-t-lg rounded-b-none p-0">
              <TabsTrigger 
                value="courses"
                className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-techknot-blue"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                My Courses
              </TabsTrigger>
              <TabsTrigger 
                value="cart"
                className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-techknot-blue"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                My Cart
              </TabsTrigger>
              <TabsTrigger 
                value="account"
                className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-techknot-blue"
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="p-6">
              {userCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userCourses.map(course => (
                    <RevealOnScroll key={course.id}>
                      <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/3 h-40 sm:h-auto">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 sm:w-2/3">
                            <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">Instructor: {course.instructor}</p>
                            
                            <div className="mb-3">
                              <div className="text-xs text-gray-500 mb-1">Progress: {course.progress}%</div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-techknot-blue h-2 rounded-full" 
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 mb-3">
                              Last accessed: {formatDate(course.lastAccessed)}
                            </div>
                            
                            <div className="flex justify-between mt-2">
                              <Button 
                                size="sm" 
                                onClick={() => continueCourse(course.id)}
                                className="bg-techknot-blue hover:bg-techknot-purple"
                              >
                                Continue
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => removeCourse(course.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold mb-2">No courses yet</h3>
                  <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet</p>
                  <Button 
                    onClick={() => navigate("/#programs")}
                    className="bg-techknot-blue hover:bg-techknot-purple"
                  >
                    Browse Programs
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cart" className="p-6">
              {userCart.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6">
                    {userCart.map(item => (
                      <RevealOnScroll key={item.id}>
                        <div className="flex items-center border-b pb-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                              <span className="mx-2 text-gray-400">|</span>
                              <span className="font-medium">₹{item.price}</span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            Remove
                          </Button>
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>₹{totalCartValue}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{totalCartValue}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={checkout}
                      className="bg-techknot-blue hover:bg-techknot-purple"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some items to your cart!</p>
                  <Button 
                    onClick={() => navigate("/shop")}
                    className="bg-techknot-blue hover:bg-techknot-purple"
                  >
                    Browse Shop
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="account" className="p-6">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-6">Account Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="border rounded-md px-3 py-2 bg-gray-50">
                      {user.fullName}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="border rounded-md px-3 py-2 bg-gray-50">
                      {user.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="border rounded-md px-3 py-2 bg-gray-50">
                      {user.username || "Not set"}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-techknot-blue hover:bg-techknot-purple"
                      onClick={() => {
                        // Open Clerk's user profile management UI instead of calling update() directly
                        user.update({});
                      }}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Profile;

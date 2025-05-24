
import RevealOnScroll from '@/components/RevealOnScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of IoT in Smart Home Technology',
      excerpt: 'Discover how IoT is transforming the way we interact with our homes and appliances.',
      author: 'Dr. Ramesh Kumar',
      date: 'May 5, 2025',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    },
    {
      id: 2,
      title: 'Electric Vehicles: A Revolutionary Step in Transportation',
      excerpt: 'Learn about the advancements in electric vehicle technology and their impact on the environment.',
      author: 'Priya Singh',
      date: 'April 28, 2025',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    },
    {
      id: 3,
      title: 'PCB Design Best Practices for Beginners',
      excerpt: 'A comprehensive guide on PCB design principles that every beginner should know.',
      author: 'Arjun Patel',
      date: 'April 20, 2025',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    },
    {
      id: 4,
      title: 'Using Blynk for IoT Application Development',
      excerpt: 'Step-by-step tutorial on building IoT applications using the Blynk platform.',
      author: 'Meera Rao',
      date: 'April 15, 2025',
      category: 'Programming',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    },
    {
      id: 5,
      title: 'RFID Technology and Its Applications',
      excerpt: 'Exploring how RFID technology works and its diverse applications in modern industries.',
      author: 'Vikram Sharma',
      date: 'April 10, 2025',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    },
    {
      id: 6,
      title: 'The Role of Drones in Modern Engineering',
      excerpt: 'How drone technology is revolutionizing various engineering fields and industries.',
      author: 'Lakshmi Venkat',
      date: 'April 5, 2025',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    },
  ];

  return (
    <>
      <Navbar />
      
      <div className="pt-24 bg-techknot-ivory min-h-screen">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-techknot-purple mb-4">TechKnots Blog</h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Insights, tutorials, and updates from our expert team on the latest in engineering, 
                IoT technology, and practical training methods.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <RevealOnScroll key={post.id} delay={index * 100}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium px-2 py-1 bg-techknot-lightpurple/20 text-techknot-purple rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{post.author}</span>
                      <Button variant="ghost" size="sm" className="text-techknot-blue hover:text-techknot-purple">
                        Read More <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="text-center pb-12">
            <Button className="bg-techknot-blue hover:bg-techknot-purple">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Blog;

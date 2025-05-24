
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Tech<span className="text-techknot-lightpurple">Knots</span></h3>
            <p className="text-gray-400 mb-6">
              Tying the knot between theory and practical syllabus in engineering education.
            </p>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-techknot-blue hover:bg-techknot-purple transition-colors flex items-center justify-center"
            >
              <ArrowUp size={20} />
            </button>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Hands-On Training</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Value Added Courses</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Final Year Projects</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Workshops</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition-colors">Course Topics</a></li>
              <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <span className="mr-2">📧</span>
                info@techknots.com
              </li>
              <li className="flex items-center text-gray-400">
                <span className="mr-2">📱</span>
                +91 98765 43210
              </li>
              <li className="flex items-center text-gray-400">
                <span className="mr-2">📍</span>
                Chennai, Tamil Nadu, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} TechKnots. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

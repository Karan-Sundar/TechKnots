
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, ShoppingCart as CartIcon, BookText, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Programs', href: '/#programs' },
    { name: 'Blog', href: '/blog', icon: BookText },
    { name: 'LMS Portal', href: '/lms', icon: BookOpen },
    { name: 'Shop', href: '/shop', icon: CartIcon },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/c7b2b957-6a5d-4e2f-838a-da932b7cc591.png" 
            alt="TechKnots Logo" 
            className="h-10"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/#') ? (
                  <a 
                    href={link.href}
                    className="font-medium hover:text-techknot-purple transition-colors flex items-center gap-1"
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.href}
                    className="font-medium hover:text-techknot-purple transition-colors flex items-center gap-1"
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-1 font-medium hover:text-techknot-purple">
                <UserCircle size={16} />
                Profile
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  }
                }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-techknot-blue hover:bg-techknot-purple transition-all">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/#') ? (
                  <a 
                    href={link.href}
                    className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon && <link.icon size={18} />}
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.href}
                    className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon && <link.icon size={18} />}
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            
            {isSignedIn ? (
              <>
                <li>
                  <Link 
                    to="/profile"
                    className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle size={18} />
                    My Profile
                  </Link>
                </li>
                <li className="px-4 py-3 flex">
                  <UserButton afterSignOutUrl="/" />
                  <span className="ml-3">Sign out</span>
                </li>
              </>
            ) : (
              <>
                <li className="px-4 pt-4">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                </li>
                <li className="px-4 pt-2">
                  <SignUpButton mode="modal">
                    <Button className="w-full bg-techknot-blue hover:bg-techknot-purple">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

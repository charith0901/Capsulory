import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Menu, X, Home, Timer, BookOpen, Plus, Archive, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isSignoutLoading, setIsSignoutLoading] = useState(false);

  const handleSignout = async () => {
    setIsSignoutLoading(true);
    await signOut();
    setIsSignoutLoading(false);
  };


  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check if a link is active
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-indigo-900/95 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <motion.div
                    whileHover={{ rotate: 20 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BookOpen size={24} className="text-white" />
                  </motion.div>
                  <span className="text-white text-xl font-bold tracking-wider">
                    Capsulory
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className={`text-gray-200 hover:text-white transition-colors duration-200 px-3 py-1 rounded-lg ${
                isActive('/') ? 'bg-white/20' : ''
              }`}>
                <div className="flex items-center space-x-1">
                  <Home size={18} />
                  <span>Home</span>
                </div>
              </Link>
              
              {session ? (
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href="/pages/myCapsules" className={`text-gray-200 hover:text-white transition-colors duration-200 px-3 py-1 rounded-lg ${
                    isActive('/pages/myCapsules') ? 'bg-white/20' : ''
                  }`}>
                    <div className="flex items-center space-x-1">
                      <Archive size={18} />
                      <span>My Capsules</span>
                    </div>
                  </Link>
                  
                  <Link href="/pages/createCapsule" className={`text-gray-200 hover:text-white transition-colors duration-200 px-3 py-1 rounded-lg ${
                    isActive('/pages/createCapsule') ? 'bg-white/20' : ''
                  }`}>
                    <div className="flex items-center space-x-1">
                      <Plus size={18} />
                      <span>Create Capsule</span>
                    </div>
                  </Link>
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      {session.user.image ? (
                        <motion.img 
                          src={session.user.image} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full border-2 border-white/30"
                          whileHover={{ scale: 1.1 }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center text-white">
                          <User size={16} />
                        </div>
                      )}
                      <span className="text-gray-200 font-medium">{session.user.name?.split(' ')[0]}</span>
                    </div>
                    
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-400">Signed in as</p>
                        <p className="text-sm font-medium truncate">{session.user.email}</p>
                      </div>
                      <button 
                        onClick={() => signOut()} 
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.button 
                  onClick={() => signIn()} 
                  className="bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-indigo-800 shadow-inner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-4 space-y-3">
              <Link href="/" className={`block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 ${
                isActive('/') ? 'bg-indigo-700 text-white' : 'text-gray-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <Home size={18} />
                  <span>Home</span>
                </div>
              </Link>
              
              {session && (
                <>
                  <Link href="/pages/myCapsules" className={`block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 ${
                    isActive('/pages/myCapsules') ? 'bg-indigo-700 text-white' : 'text-gray-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Archive size={18} />
                      <span>My Capsules</span>
                    </div>
                  </Link>
                  
                  <Link href="/pages/createCapsule" className={`block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 ${
                    isActive('/pages/createCapsule') ? 'bg-indigo-700 text-white' : 'text-gray-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Plus size={18} />
                      <span>Create Capsule</span>
                    </div>
                  </Link>
                </>
              )}
              
              {session ? (
                <div className="mt-6 pt-3 border-t border-indigo-700">
                  <div className="flex items-center px-3 mb-3">
                    {session.user.image ? (
                      <img 
                        src={session.user.image} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full mr-2 border border-white/30"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-2">
                        <User size={16} />
                      </div>
                    )}
                    <div>
                      <div className="text-white font-medium">{session.user.name}</div>
                      <div className="text-xs text-gray-300 truncate max-w-[200px]">{session.user.email}</div>
                    </div>
                  </div>
                  <motion.button 
                    onClick={() => handleSignout()} 
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut size={18} />
                    {isSignoutLoading ? 
                      <span>Sign Out</span>:
                      <span>Signing Out....</span>
                    }
                  </motion.button>
                </div>
              ) : (
                <motion.button 
                  onClick={() => signIn()} 
                  className="w-full bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Layout Wrapper Component */}
      <style jsx global>{`
        /* Add this to your global CSS or as a styled-jsx block */
        main, .main-content {
          padding-top: 1rem; /* Add some spacing after the navbar */
        }
      `}</style>
    </>
  );
}
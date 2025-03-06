import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Menu, X, Home, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
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
                <BookOpen size={24} className="text-white" />
                <span className="text-white text-xl font-bold tracking-wider">
                  Capsulory
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-200">
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
                <span className="text-gray-200">
                  <span className="text-gray-300">Welcome,</span> {session.user.name}
                </span>
                <motion.button 
                  onClick={() => signOut()} 
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.button 
                onClick={() => signIn()} 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
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
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-indigo-700 shadow-inner"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-4 space-y-3">
            <Link href="/" className="block px-3 py-2 text-white rounded-md hover:bg-indigo-800 transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <Home size={18} />
                <span>Home</span>
              </div>
            </Link>
            
            {session ? (
              <div className="space-y-3 px-3 py-2">
                <div className="text-gray-200">Welcome, {session.user.name}</div>
                <motion.button 
                  onClick={() => signOut()} 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            ) : (
              <motion.button 
                onClick={() => signIn()} 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
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
  );
}
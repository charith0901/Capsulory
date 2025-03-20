import { useState, useEffect } from 'react';
import { ArrowRight, Lock, Clock, Cloud } from 'lucide-react';
import Link from 'next/link';

export default function CapsuloryLanding() {
  // For animations on scroll
  const [isVisible, setIsVisible] = useState({
    features: false,
    howItWorks: false,
    testimonials: false
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const features = document.getElementById('features');
      const howItWorks = document.getElementById('how-it-works');
      const testimonials = document.getElementById('testimonials');
      
      if (features && isElementInViewport(features)) {
        setIsVisible(prev => ({ ...prev, features: true }));
      }
      
      if (howItWorks && isElementInViewport(howItWorks)) {
        setIsVisible(prev => ({ ...prev, howItWorks: true }));
      }
      
      if (testimonials && isElementInViewport(testimonials)) {
        setIsVisible(prev => ({ ...prev, testimonials: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      {/* Hero Section - Enhanced */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 rounded-full bg-pink-600/10 blur-3xl -bottom-40 -right-20 animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 py-20">
          <div className="flex flex-col items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 text-center">
                Welcome to Capsulory
              </h1>
              <p className="text-xl md:text-2xl text-center max-w-3xl mb-12 text-gray-300">
                Preserve your precious memories forever. Create your own digital time capsule and unlock them in the future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/pages/myCapsules">
                <button className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl bg-purple-600 hover:bg-purple-700 flex items-center gap-2 shadow-lg shadow-purple-600/30 transform hover:scale-105 transition-all">
                  Get Started <ArrowRight size={20} />
                </button>
                </Link>
                <button className="px-8 py-6 text-lg rounded-2xl border border-purple-400  text-purple-400 hover:bg-purple-900/20 transform hover:scale-105 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating capsule visualization */}
        <div className="relative w-full max-w-2xl h-64 mt-8 mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-white/10 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 rounded-full bg-purple-600/50 animate-pulse backdrop-blur-md flex items-center justify-center">
              <Lock size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Capsulory?</h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible.features ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm transform hover:scale-105 transition-all rounded-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center mb-4">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-300">Bank-level encryption keeps your memories safe until you&apos;re ready to revisit them.</p>
            </div>
          </div>
          
          <div className="bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm transform hover:scale-105 transition-all rounded-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timeless</h3>
              <p className="text-gray-300">Schedule your memories to be unlocked at any future date, from weeks to decades.</p>
            </div>
          </div>
          
          <div className="bg-purple-900/40 border border-purple-500/20 backdrop-blur-sm transform hover:scale-105 transition-all rounded-lg">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center mb-4">
                <Cloud size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Yours</h3>
              <p className="text-gray-300">Full control over your content with privacy settings and sharing options.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 px-4 md:px-8 bg-black/30">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible.howItWorks ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Capsule</h3>
              <p className="text-gray-300">Upload photos, videos, text, and more to your personal time capsule.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Set the Timer</h3>
              <p className="text-gray-300">Choose when you want your capsule to be unlocked - any date in the future.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Seal It Away</h3>
              <p className="text-gray-300">Your memories are encrypted and stored securely in our cloud.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rediscover Later</h3>
              <p className="text-gray-300">When the time comes, receive a notification to unlock your past memories.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Preserve Your Memories?</h2>
          <p className="text-xl text-gray-300 mb-12">Start your digital time capsule journey today and give your future self a gift of memories.</p>
          <Link href="/pages/myCapsules">
          <button className="px-8 py-6 text-lg rounded-2xl bg-purple-600 hover:bg-purple-700 flex items-center gap-2 mx-auto shadow-lg shadow-purple-600/30 transform hover:scale-105 transition-all">
            Get Started Now <ArrowRight size={20} />
          </button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-black/50 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} Capsulory. All rights reserved.</p>
      </footer>
    </div>
  );
}
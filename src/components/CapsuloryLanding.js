import Button from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CapsuloryLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white flex flex-col items-center justify-center">
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Capsulory
      </motion.h1>
      <motion.p
        className="text-lg text-center max-w-2xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Preserve your precious memories forever. Create your own digital time capsule and unlock them in the future.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Button className="px-6 py-3 text-lg rounded-2xl bg-purple-600 hover:bg-purple-700">
          Get Started
        </Button>
      </motion.div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Why Capsulory?</h2>
        <p className="text-lg">Secure. Timeless. Yours.</p>
      </motion.div>
    </div>
  );
}

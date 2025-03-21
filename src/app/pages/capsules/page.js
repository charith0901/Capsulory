'use client';

import { useEffect, useState } from 'react';
import { getAllCapsules,deleteCapsule } from '@/app/services/capsuleApi';
import CapsuleCard from '@/components/CapsuleCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useSession } from 'next-auth/react';
import { Loader, Archive, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const Capsules = () => {
  const [capsules, setCapsules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session) {
      setIsLoading(true);
      getAllCapsules(session.user)
        .then((data) => {
          setCapsules(data);
        })
        .catch((error) => {
          console.error("Error fetching capsules:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this capsule?")) {
      deleteCapsule(id)
        .then(() => {
          setCapsules(capsules.filter(capsule => capsule._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting capsule:", error);
        });
    }
  };

  return (
    <>
    <Navbar/>
    <ProtectedRoute>
      <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Archive className="text-indigo-600 w-6 h-6 mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">Your Time Capsules</h1>
            </div>
            <Link
              href="/pages/createCapsule"
            >
            <motion.button
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create New
            </motion.button>
            </Link>
          </div>
          <p className="text-gray-600 mt-2">Memories preserved for the future</p>
        </header>
        
         {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex flex-col bg-neutral-300 w-full h-64 animate-pulse rounded-xl p-4 gap-4"
                >
                  <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                    <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                    <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : capsules.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {capsules.map((capsule) => (
              <motion.div key={capsule._id} variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}>
                <CapsuleCard capsule={capsule} onDelete={handleDelete} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16 bg-white rounded-lg shadow-sm border border-indigo-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Archive className="text-indigo-300 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">No capsules found</h2>
            <p className="text-gray-500 mt-2">Create your first time capsule to get started!</p>
            <motion.button
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Time Capsule
            </motion.button>
          </motion.div>
        )}
      </div>
    </ProtectedRoute>
    </>
  );
};

export default Capsules;
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TimerIcon } from 'lucide-react';
import Link from 'next/link';


const CapsuleCard = ({ capsule, onDelete }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <motion.h2 
          className="text-2xl font-bold text-indigo-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {capsule.title}
        </motion.h2>
        <motion.div
          whileHover={{ rotate: 20 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimerIcon className="text-purple-600 w-6 h-6" />
        </motion.div>
      </div>
      
      <div className="space-y-3">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Calendar className="text-indigo-600 w-5 h-5" />
          <p className="text-sm font-medium text-gray-700">Created: {new Date(capsule.createdAt).toLocaleString() || "Unknown"}</p>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Clock className="text-indigo-600 w-5 h-5" />
          <p className="text-sm font-medium text-gray-700">Can be Opened After: {new Date(capsule.deliveryDate).toLocaleString()}</p>
        </motion.div>
      </div>

      {
        <Link
        className='disabled:opacity-50 disabled:cursor-not-allowed'
        href={`capsules/${capsule._id}`}
        >
        <motion.button
        disabled={new Date(capsule.deliveryDate) >= new Date()}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Open Capsule {new Date(capsule.deliveryDate) >= new Date() ? ' (Not Yet Available)' : ''}
      </motion.button>
      </Link>
      }
      <motion.button
        className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onDelete(capsule._id)}
      >
        Delete Capsule
      </motion.button>
    </motion.div>
  );
};

export default CapsuleCard;
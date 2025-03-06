"use client";

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Timer, Clock, Tag, Eye, EyeOff, FileText, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateCapsule() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setUnlockDate] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/Capsules', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          deliveryDate,
          visibility: isPublic ? 'public' : 'private',
          tags,
          email: session.user.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data =response;
      console.log(data);
      if (data.ok) {
        // Show success animation
        setTimeout(() => {
          router.push('/pages/myCapsules');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating capsule:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      const newTags = tagInput.split(',').map(tag => tag.trim());
      setTags([...tags, ...newTags.filter(tag => tag !== '')]);
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 text-indigo-600">
          <Loader2 size={48} />
        </div>
      </div>
    );
  }

  if (!session) {
    signIn();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Timer className="h-10 w-10 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">Create Time Capsule</h1>
          <p className="mt-2 text-lg text-gray-600">
            Preserve your memories for future delivery
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2" />
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Time Capsule"
                    required
                    className="focus:ring-indigo-500 text-gray-900 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share the story behind this capsule..."
                    className="focus:ring-indigo-500 text-gray-900 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="delivery-date" className="block text-sm font-medium text-gray-700">
                  Delivery Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="datetime-local"
                    id="delivery-date"
                    value={deliveryDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    required
                    className="focus:ring-indigo-500 text-gray-900 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">When should this capsule be delivered?</p>
              </div>

              <div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isPublic ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className="sr-only">Toggle visibility</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        isPublic ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="ml-3 flex items-center text-sm">
                    {isPublic ? (
                      <>
                        <Eye className="h-4 w-4 text-indigo-600 mr-1" />
                        <span>Public capsule</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4 text-gray-500 mr-1" />
                        <span>Private capsule</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 ml-14">
                  {isPublic 
                    ? "Anyone can view this capsule when it's delivered" 
                    : "Only you can view this capsule when it's delivered"}
                </p>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={handleTagsChange}
                      className="focus:ring-indigo-500 text-gray-900 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md"
                      placeholder="Add tags..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1.5 inline-flex text-indigo-500 hover:text-indigo-700"
                        >
                          <span className="sr-only">Remove tag</span>
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Creating your capsule...
                    </span>
                  ) : (
                    'Create Time Capsule'
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
'use client';

import { getById } from "@/app/services/capsuleApi";
import { useState, useEffect } from "react";
import { Calendar, Tag, Eye, Lock, Clock, User, Users, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CapsuleDetails({ params }) {
    const [capsule, setCapsule] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState();

    useEffect(() => {
        params.then((resolvedParams) => {
            setId(resolvedParams.id);
        });
    }, [params]);

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);
        getById(id)
            .then((data) => {
                setCapsule(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching capsules:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    // Format date to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return <CapsuleDetailsSkeleton />;
    }

    if (!capsule) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
                    <div className="text-red-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">Capsule Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested capsule could not be loaded or doesn&apos;t exist.</p>
                    <Link href="/pages/capsules" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Capsules
                    </Link>
                </div>
            </div>
        );
    }

    const isUpcoming = new Date(capsule.deliveryDate) > new Date();
    const deliveryStatus = isUpcoming ? 
        { color: "text-amber-600 bg-amber-50 border-amber-200", label: "Upcoming" } : 
        { color: "text-green-600 bg-green-50 border-green-200", label: "Delivered" };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <Link href="/pages/capsules" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all capsules
                </Link>
                
                <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{capsule.title}</h1>
                                <p className="text-blue-100 text-lg">{capsule.description}</p>
                            </div>
                            <div className={`${deliveryStatus.color} px-3 py-1 rounded-full text-sm font-medium border`}>
                                {deliveryStatus.label}
                            </div>
                        </div>
                    </div>

                    {/* Status bar */}
                    <div className="p-4 bg-white border-b flex items-center justify-between">
                        <div className="flex items-center">
                            {capsule.visibility === "public" ? (
                                <div className="flex items-center text-green-600">
                                    <Eye className="w-5 h-5 mr-1" />
                                    <span className="text-sm font-medium">Public</span>
                                </div>
                            ) : (
                                <div className="flex items-center text-gray-600">
                                    <Lock className="w-5 h-5 mr-1" />
                                    <span className="text-sm font-medium">Private</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex items-center">
                            {capsule.isEncrypted ? (
                                <div className="flex items-center text-green-600">
                                    <Lock className="w-5 h-5 mr-1" />
                                    <span className="text-sm font-medium">Encrypted</span>
                                </div>
                            ) : (
                                <div className="flex items-center text-gray-500">
                                    <Lock className="w-5 h-5 mr-1" />
                                    <span className="text-sm font-medium">Not Encrypted</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:flex">
                        {/* Left column: Content */}
                        <div className="lg:w-2/3 p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Content</h3>
                            <div className="prose max-w-none bg-gray-50 p-6 rounded-lg border border-gray-100">
                                {capsule.content ? (
                                    <p className="text-gray-700 whitespace-pre-wrap">{capsule.content}</p>
                                ) : (
                                    <p className="text-gray-500 italic">No content available</p>
                                )}
                            </div>
                            
                            {/* Tags */}
                            {capsule.tags && capsule.tags.length > 0 && (
                                <div className="mt-8">
                                    <div className="flex items-center mb-3">
                                        <Tag className="w-5 h-5 text-blue-600 mr-2" />
                                        <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {capsule.tags.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Right column: Metadata */}
                        <div className="lg:w-1/3 bg-gray-50 p-6 border-l">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Details</h3>
                            
                            <div className="space-y-5">
                                <MetadataItem 
                                    icon={<Calendar className="w-5 h-5 text-blue-600" />} 
                                    label="Created" 
                                    value={formatDate(capsule.createdAt)} 
                                />
                                <MetadataItem 
                                    icon={<Clock className="w-5 h-5 text-blue-600" />} 
                                    label="Last Updated" 
                                    value={formatDate(capsule.updatedAt)} 
                                />
                                <MetadataItem 
                                    icon={<Clock className="w-5 h-5 text-indigo-600" />} 
                                    label="Delivery Date" 
                                    value={formatDate(capsule.deliveryDate)}
                                    highlight={true}
                                />
                                <MetadataItem 
                                    icon={<User className="w-5 h-5 text-blue-600" />} 
                                    label="Owner ID" 
                                    value={capsule.ownerId} 
                                />
                                
                                {capsule.sharedUsers && capsule.sharedUsers.length > 0 && (
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <Users className="w-5 h-5 text-blue-600 mr-2" />
                                            <p className="text-sm text-gray-500">Shared With</p>
                                        </div>
                                        <div className="ml-7">
                                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                <p className="text-sm text-gray-700">
                                                    {`${capsule.sharedUsers.length} user${capsule.sharedUsers.length > 1 ? 's' : ''}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Capsule ID */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Capsule ID</p>
                                <code className="block bg-gray-100 p-2 rounded text-xs text-gray-700 font-mono truncate">
                                    {capsule._id}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Skeleton loader component that mirrors the actual content structure
function CapsuleDetailsSkeleton() {
    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back button skeleton */}
                <div className="w-36 h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
                
                <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
                    {/* Header skeleton */}
                    <div className="bg-gradient-to-r from-blue-300 to-indigo-300 p-8 relative animate-pulse">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3">
                                <div className="h-8 w-64 bg-blue-200 rounded-lg"></div>
                                <div className="h-6 w-48 bg-blue-200 rounded-lg"></div>
                            </div>
                            <div className="w-24 h-6 bg-amber-200 rounded-full"></div>
                        </div>
                    </div>

                    {/* Status bar skeleton */}
                    <div className="p-4 bg-white border-b flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
                            <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
                            <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Main content skeleton */}
                    <div className="lg:flex">
                        {/* Left column skeleton */}
                        <div className="lg:w-2/3 p-6">
                            <div className="h-7 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                            <div className="h-48 bg-gray-100 rounded-lg border border-gray-100 p-6 animate-pulse">
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                                </div>
                            </div>
                            
                            {/* Tags skeleton */}
                            <div className="mt-8">
                                <div className="flex items-center mb-3">
                                    <div className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Right column skeleton */}
                        <div className="lg:w-1/3 bg-gray-50 p-6 border-l">
                            <div className="h-6 w-24 bg-gray-200 rounded mb-6 animate-pulse"></div>
                            
                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="flex items-center mb-2">
                                            <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
                                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="ml-7">
                                            <div className="h-5 w-32 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Capsule ID skeleton */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="h-3 w-16 bg-gray-200 rounded mb-2 animate-pulse"></div>
                                <div className="h-8 bg-gray-100 p-2 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced MetadataItem component
const MetadataItem = ({ icon, label, value, highlight = false }) => (
    <div>
        <div className="flex items-center mb-1">
            <div className="mr-2">{icon}</div>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
        <div className="ml-7">
            <p className={`font-medium ${highlight ? 'text-indigo-700' : 'text-gray-700'}`}>
                {value}
            </p>
        </div>
    </div>
);
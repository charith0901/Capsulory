'use client';
//import { useRecoilState } from 'recoil';
import { capsuleAtom } from '@/app/recoil/capsuleAtom';
import { useEffect, useState } from 'react';
import { getAllCapsules } from '@/app/services/capsuleApi';
import CapsuleCard from '@/components/CapsuleCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useSession } from 'next-auth/react';

const Capsules = () => {
  const [capsules, setCapsules] = useState([]);//useRecoilState(capsuleAtom);
  const [isloading,setIsLoading] = useState(false);
  const {data:session} = useSession();

  useEffect(() => {
    if (session) {
      setIsLoading(true);
      getAllCapsules(session.user).then((data) => {
        setCapsules(data);
        setIsLoading(false);
      });
    }
  }, [session]);

  if(isloading){
    return <div>Loading...</div>
  }

  return (
    <ProtectedRoute>
    <div>
      {capsules.map((capsule) => (
        <CapsuleCard key={capsule._id} capsule={capsule} />
      ))}
    </div>
    </ProtectedRoute>
  );
};

export default Capsules;

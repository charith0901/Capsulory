"use client"; // Make sure this is a client component

import { useSession,signIn } from "next-auth/react";
import { useEffect } from "react";

export default function ProtectedRoute({children}) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      signIn();
    }
  }, [session, status]);

  if (status === "loading") {
    return(
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div
        className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      >
        <div
          className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
        ></div>
      </div>
    </div>
    );
    
  }
if(session){
  return (
    <>
      {children}
    </>
  );
}
}

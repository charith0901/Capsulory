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
    return <p>Loading...</p>;
  }
if(session){
  return (
    <>
      {children}
    </>
  );
}
}

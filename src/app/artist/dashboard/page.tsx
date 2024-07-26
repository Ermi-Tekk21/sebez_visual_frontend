import React, { useEffect } from "react";
import useAuthStore from '@/stores/AuthStore';
import { useRouter } from "next/navigation";
function page() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Get isAuthenticated from useAuthStore
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin"); // Redirect to signin page if not authenticated
    }
  }, []);
  return (
    <div className='right-0 w-3/4'>dashbord</div>
  )
}

export default page
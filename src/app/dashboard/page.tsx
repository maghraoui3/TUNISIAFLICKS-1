"use client";
import { useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl">Welcome, {user.displayName || 'User'}!</h1>
    </div>
  );
}

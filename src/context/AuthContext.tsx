"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/config/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextProps {
  user: User | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

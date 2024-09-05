"use client";
import { useState } from 'react';
import {
  loginWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  loginAnonymously,
  sendPasswordResetEmail
} from '@/lib/auth.firebase';
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter()

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    const { user, error } = await loginWithEmail(email, password);

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard')
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const { user, error } = await loginWithGoogle();

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError(null);

    const { user, error } = await loginWithFacebook();

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    setError(null);

    const { user, error } = await loginAnonymously();

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }
    setLoading(true);
    const { error } = await sendPasswordResetEmail(email);
    if (error) {
      setError(error.message);
    } else {
      alert('Password reset email sent!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-t" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-t" />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login with Google'}
          </button>

          <button
            onClick={handleFacebookLogin}
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login with Facebook'}
          </button>

          <button
            onClick={handleAnonymousLogin}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login Anonymously'}
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Don{"'"}t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

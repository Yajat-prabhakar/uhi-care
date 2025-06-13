import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      const user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || '',
        role: data.user.user_metadata?.role || 'patient',
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.email === 'admin@example.com') {
        window.location.href = 'https://uhi-admin.netlify.app/';
      } else if (user.role === 'doctor') {
        window.location.href = 'https://uhi-doc.netlify.app/';
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login failed:', err.message);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    window.open('https://uhi-admin.netlify.app/', '_blank');
  };

  const handleDoctorLogin = () => {
    window.open('https://uhi-doc.netlify.app/', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </motion.button>
      </form>

      <div className="mt-4 text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdminLogin}
          className="text-blue-500 hover:text-blue-700 font-semibold block"
        >
          Admin Login
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDoctorLogin}
          className="text-green-500 hover:text-green-700 font-semibold block mt-2"
        >
          Doctor Login
        </motion.button>
      </div>

      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>

      {/* Spacer to push footer down */}
      <div className="h-16" />
    </motion.div>
  );
}

export default SignIn;

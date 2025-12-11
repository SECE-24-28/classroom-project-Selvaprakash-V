import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Layout from '../components/Layout';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const AdminLogin = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = loginAdmin(data.email, data.password);
    
    if (result.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Layout showSidebar={false}>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl mb-4">
              <FiShield className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputField
                label="Admin Email"
                type="email"
                placeholder="Enter admin email"
                icon={FiMail}
                error={errors.email?.message}
                {...register('email')}
              />

              <InputField
                label="Password"
                type="password"
                placeholder="Enter admin password"
                icon={FiLock}
                error={errors.password?.message}
                {...register('password')}
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                Admin Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
              >
                ← Back to User Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;

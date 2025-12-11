import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiUser, FiMail, FiPhone, FiEdit2, FiSave, FiX, FiClock, FiZap, FiShield } from 'react-icons/fi';
import Layout from '../components/Layout';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const schema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits').required('Phone is required'),
}).required();

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalRecharges: 0, totalSpent: 0 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  useEffect(() => {
    // Load user stats
    const transactions = JSON.parse(localStorage.getItem('rechargex_transactions') || '[]');
    const userTransactions = transactions.filter(t => t.userId === user?.id);
    const totalSpent = userTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    setStats({
      totalRecharges: userTransactions.length,
      totalSpent,
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateProfile(data);
    setIsEditing(false);
    setLoading(false);
  };

  const handleCancel = () => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your account settings and preferences
        </p>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-orange-100">{user?.email}</p>
                <div className="flex items-center gap-1 mt-2">
                  <FiShield className="w-4 h-4" />
                  <span className="text-sm">Verified Account</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                <FiZap className="w-5 h-5" />
                <span className="text-2xl font-bold">{stats.totalRecharges}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Recharges</p>
            </div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-2">
                <span className="text-2xl font-bold">₹{stats.totalSpent}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h3>
              {!isEditing && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <FiEdit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                  icon={FiUser}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  icon={FiMail}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone"
                  icon={FiPhone}
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <div className="flex gap-4 pt-4">
                  <Button type="submit" loading={loading}>
                    <FiSave className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleCancel}>
                    <FiX className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg">
                    <FiUser className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Information
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Account ID</span>
              <span className="font-medium text-gray-900 dark:text-white">#{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Account Type</span>
              <span className="font-medium text-gray-900 dark:text-white capitalize">{user?.role || 'User'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Member Since</span>
              <span className="font-medium text-gray-900 dark:text-white">December 2024</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FiPhone, FiSearch, FiCheck, FiZap, FiX } from 'react-icons/fi';
import Layout from '../components/Layout';
import InputField from '../components/InputField';
import Button from '../components/Button';
import PlanCard from '../components/PlanCard';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://6932771ce5a9e342d26f4026.mockapi.io/recharge/plans';

const operators = ['Airtel', 'Jio', 'Vi', 'BSNL'];
const circles = ['Delhi', 'Mumbai', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Gujarat', 'Andhra Pradesh', 'Kerala'];

const schema = yup.object({
  phone: yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone number is required'),
  operator: yup.string().required('Please select an operator'),
  circle: yup.string().required('Please select a circle'),
}).required();

const Recharge = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rechargeComplete, setRechargeComplete] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchedValues = watch();

  // Fetch plans from API
  // Schema: { PlanName, Price, Data, Validity, AddOns, id }
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPlans(data);
        setFilteredPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        // Fallback to mock data matching API schema
        const mockPlans = [
          { id: '1', PlanName: 'Basic Talktime Pack', Price: 79, Data: 0, Validity: 30, AddOns: 'Talktime ₹64' },
          { id: '2', PlanName: 'Data Booster', Price: 149, Data: 1, Validity: 28, AddOns: 'Unlimited calls, 100 SMS/day' },
          { id: '3', PlanName: 'Popular Plan', Price: 299, Data: 2, Validity: 28, AddOns: 'Unlimited calls, 100 SMS/day, Free caller tune' },
          { id: '4', PlanName: 'Super Saver', Price: 499, Data: 3, Validity: 56, AddOns: 'Unlimited calls, Unlimited SMS, OTT subscription' },
          { id: '5', PlanName: 'Premium Pack', Price: 699, Data: 2, Validity: 84, AddOns: 'Unlimited calls, Unlimited SMS, Amazon Prime' },
          { id: '6', PlanName: 'Annual Plan', Price: 2999, Data: 2, Validity: 365, AddOns: 'Unlimited everything, All OTT apps' },
        ];
        setPlans(mockPlans);
        setFilteredPlans(mockPlans);
      }
      setLoadingPlans(false);
    };
    fetchPlans();
  }, []);

  // Filter plans based on search and category
  useEffect(() => {
    let result = plans;
    
    if (searchTerm) {
      result = result.filter(plan =>
        plan.PlanName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.Price?.toString().includes(searchTerm) ||
        plan.AddOns?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      if (filterCategory === 'budget') {
        result = result.filter(plan => plan.Price < 200);
      } else if (filterCategory === 'popular') {
        result = result.filter(plan => plan.Price >= 200 && plan.Price < 500);
      } else if (filterCategory === 'premium') {
        result = result.filter(plan => plan.Price >= 500);
      }
    }

    setFilteredPlans(result);
  }, [searchTerm, filterCategory, plans]);

  const onSubmit = () => {
    setShowPlans(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleRecharge = async () => {
    if (!selectedPlan) return;
    
    setLoading(true);
    setShowConfirmation(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save transaction to localStorage
    // Using API schema: { PlanName, Price, Data, Validity, AddOns, id }
    const transaction = {
      id: Date.now(),
      oderId: user?.id,
      phone: watchedValues.phone,
      operator: watchedValues.operator,
      circle: watchedValues.circle,
      planId: selectedPlan.id,
      planName: selectedPlan.PlanName,
      amount: selectedPlan.Price,
      validity: selectedPlan.Validity,
      data: selectedPlan.Data,
      addOns: selectedPlan.AddOns,
      status: 'success',
      date: new Date().toISOString(),
    };

    const storedTransactions = JSON.parse(localStorage.getItem('rechargex_transactions') || '[]');
    storedTransactions.unshift(transaction);
    localStorage.setItem('rechargex_transactions', JSON.stringify(storedTransactions));

    setLoading(false);
    setRechargeComplete(true);
  };

  if (rechargeComplete) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-12">
          <div className="bg-green-100 dark:bg-green-900/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Recharge Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your recharge of ₹{selectedPlan?.Price} for {watchedValues.phone} has been processed successfully.
          </p>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Transaction Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Mobile Number</span>
                <span className="font-medium text-gray-900 dark:text-white">{watchedValues.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Operator</span>
                <span className="font-medium text-gray-900 dark:text-white">{watchedValues.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plan</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.PlanName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Validity</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.Validity} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Data</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.Data > 0 ? `${selectedPlan?.Data} GB/Day` : 'No Data'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium text-green-600">₹{selectedPlan?.Price}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/history')}>
              View History
            </Button>
            <Button variant="outline" onClick={() => {
              setRechargeComplete(false);
              setShowPlans(false);
              setSelectedPlan(null);
            }}>
              New Recharge
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Mobile Recharge
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Instant prepaid mobile recharge with best plans
        </p>

        {/* Recharge Form */}
        {!showPlans && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm mb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputField
                label="Mobile Number"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                icon={FiPhone}
                error={errors.phone?.message}
                {...register('phone')}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Operator
                  </label>
                  <select
                    {...register('operator')}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Operator</option>
                    {operators.map(op => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                  {errors.operator && (
                    <p className="mt-1 text-sm text-red-500">{errors.operator.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Circle
                  </label>
                  <select
                    {...register('circle')}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Circle</option>
                    {circles.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.circle && (
                    <p className="mt-1 text-sm text-red-500">{errors.circle.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <FiZap className="w-5 h-5 mr-2" />
                View Recharge Plans
              </Button>
            </form>
          </div>
        )}

        {/* Plans Section */}
        {showPlans && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" onClick={() => setShowPlans(false)}>
                ← Back
              </Button>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Plans for {watchedValues.phone} ({watchedValues.operator})
                </h2>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'budget', 'popular', 'premium'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterCategory === cat
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Plans Grid */}
            {loadingPlans ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    selected={selectedPlan?.id === plan.id}
                    onSelect={handlePlanSelect}
                  />
                ))}
              </div>
            )}

            {/* Proceed Button */}
            {selectedPlan && (
              <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 lg:static lg:bg-transparent lg:border-0 lg:p-0">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Selected Plan</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedPlan.PlanName} - ₹{selectedPlan.Price}
                    </p>
                  </div>
                  <Button size="lg" onClick={() => setShowConfirmation(true)}>
                    Proceed to Pay ₹{selectedPlan.Price}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Confirm Recharge
                </h3>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Mobile Number</span>
                  <span className="font-medium text-gray-900 dark:text-white">{watchedValues.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Operator</span>
                  <span className="font-medium text-gray-900 dark:text-white">{watchedValues.operator}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.PlanName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Validity</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.Validity} Days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Data</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPlan?.Data > 0 ? `${selectedPlan?.Data} GB/Day` : 'No Data'}</span>
                </div>
                {selectedPlan?.AddOns && (
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                    <span className="text-gray-500">Add-ons</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right max-w-[200px]">{selectedPlan?.AddOns}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-xl text-green-600">₹{selectedPlan?.Price}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  loading={loading}
                  onClick={handleRecharge}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Recharge;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch, FiZap, FiSave } from 'react-icons/fi';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import InputField from '../../components/InputField';

const API_URL = 'https://6932771ce5a9e342d26f4026.mockapi.io/recharge/plans';

// Schema matching API: { PlanName, Price, Data, Validity, AddOns, id }
const schema = yup.object({
  PlanName: yup.string().required('Plan name is required'),
  Price: yup.number().positive('Price must be positive').required('Price is required'),
  Validity: yup.number().positive('Validity must be positive').required('Validity is required'),
  Data: yup.number().min(0, 'Data must be 0 or more').required('Data is required'),
  AddOns: yup.string(),
}).required();

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch plans
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPlans(data);
      setFilteredPlans(data);
      
      // Also save to localStorage for offline access
      localStorage.setItem('rechargex_plans', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Load from localStorage if API fails
      const storedPlans = JSON.parse(localStorage.getItem('rechargex_plans') || '[]');
      if (storedPlans.length === 0) {
        // Use default plans matching API schema
        const defaultPlans = [
          { id: '1', PlanName: 'Basic Talktime Pack', Price: 79, Data: 0, Validity: 30, AddOns: 'Talktime ₹64' },
          { id: '2', PlanName: 'Data Booster', Price: 149, Data: 1, Validity: 28, AddOns: 'Unlimited calls, 100 SMS/day' },
          { id: '3', PlanName: 'Popular Plan', Price: 299, Data: 2, Validity: 28, AddOns: 'Unlimited calls, 100 SMS/day, Free caller tune' },
          { id: '4', PlanName: 'Super Saver', Price: 499, Data: 3, Validity: 56, AddOns: 'Unlimited calls, Unlimited SMS, OTT subscription' },
          { id: '5', PlanName: 'Premium Pack', Price: 699, Data: 2, Validity: 84, AddOns: 'Unlimited calls, Unlimited SMS, Amazon Prime' },
          { id: '6', PlanName: 'Annual Plan', Price: 2999, Data: 2, Validity: 365, AddOns: 'Unlimited everything, All OTT apps' },
        ];
        setPlans(defaultPlans);
        setFilteredPlans(defaultPlans);
        localStorage.setItem('rechargex_plans', JSON.stringify(defaultPlans));
      } else {
        setPlans(storedPlans);
        setFilteredPlans(storedPlans);
      }
    }
    setLoading(false);
  };

  // Filter plans
  useEffect(() => {
    if (searchTerm) {
      setFilteredPlans(plans.filter(p => 
        p.PlanName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.Price?.toString().includes(searchTerm) ||
        p.AddOns?.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredPlans(plans);
    }
  }, [searchTerm, plans]);

  const openModal = (plan = null) => {
    setEditingPlan(plan);
    if (plan) {
      reset({
        PlanName: plan.PlanName,
        Price: plan.Price,
        Validity: plan.Validity,
        Data: plan.Data,
        AddOns: plan.AddOns || '',
      });
    } else {
      reset({
        PlanName: '',
        Price: '',
        Validity: '',
        Data: '',
        AddOns: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPlan(null);
    reset();
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    
    try {
      if (editingPlan) {
        // Update plan
        const response = await fetch(`${API_URL}/${editingPlan.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          const updatedPlan = await response.json();
          setPlans(plans.map(p => p.id === editingPlan.id ? updatedPlan : p));
        } else {
          // Update locally
          const updatedPlans = plans.map(p => p.id === editingPlan.id ? { ...p, ...data } : p);
          setPlans(updatedPlans);
          localStorage.setItem('rechargex_plans', JSON.stringify(updatedPlans));
        }
      } else {
        // Create plan
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          const newPlan = await response.json();
          setPlans([...plans, newPlan]);
        } else {
          // Create locally
          const newPlan = { ...data, id: Date.now().toString() };
          const updatedPlans = [...plans, newPlan];
          setPlans(updatedPlans);
          localStorage.setItem('rechargex_plans', JSON.stringify(updatedPlans));
        }
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving plan:', error);
      // Save locally on error
      if (editingPlan) {
        const updatedPlans = plans.map(p => p.id === editingPlan.id ? { ...p, ...data } : p);
        setPlans(updatedPlans);
        localStorage.setItem('rechargex_plans', JSON.stringify(updatedPlans));
      } else {
        const newPlan = { ...data, id: Date.now().toString() };
        const updatedPlans = [...plans, newPlan];
        setPlans(updatedPlans);
        localStorage.setItem('rechargex_plans', JSON.stringify(updatedPlans));
      }
      closeModal();
    }
    
    setSubmitting(false);
  };

  const deletePlan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setPlans(plans.filter(p => p.id !== id));
      } else {
        throw new Error('Delete failed');
      }
    } catch {
      // Delete locally
      const updatedPlans = plans.filter(p => p.id !== id);
      setPlans(updatedPlans);
      localStorage.setItem('rechargex_plans', JSON.stringify(updatedPlans));
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create, edit, and manage recharge plans
          </p>
        </div>
        <Button onClick={() => openModal()}>
          <FiPlus className="w-5 h-5 mr-2" />
          Add New Plan
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredPlans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Validity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Add-ons
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg">
                          <FiZap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{plan.PlanName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-green-600">₹{plan.Price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {plan.Validity} Days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {plan.Data > 0 ? `${plan.Data} GB/Day` : 'No Data'}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-[200px] truncate">
                      {plan.AddOns || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(plan)}
                          className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <FiZap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No plans found</p>
            <Button className="mt-4" onClick={() => openModal()}>
              <FiPlus className="w-4 h-4 mr-2" />
              Create First Plan
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                label="Plan Name"
                placeholder="e.g., Basic Talktime Pack"
                error={errors.PlanName?.message}
                {...register('PlanName')}
              />

              <InputField
                label="Price (₹)"
                type="number"
                placeholder="e.g., 299"
                error={errors.Price?.message}
                {...register('Price')}
              />

              <InputField
                label="Validity (Days)"
                type="number"
                placeholder="e.g., 28"
                error={errors.Validity?.message}
                {...register('Validity')}
              />

              <InputField
                label="Data (GB/Day, 0 for no data)"
                type="number"
                placeholder="e.g., 2"
                error={errors.Data?.message}
                {...register('Data')}
              />

              <InputField
                label="Add-ons"
                placeholder="e.g., Unlimited calls, 100 SMS/day"
                error={errors.AddOns?.message}
                {...register('AddOns')}
              />

              <div className="flex gap-4 pt-4">
                <Button type="submit" loading={submitting} className="flex-1">
                  <FiSave className="w-4 h-4 mr-2" />
                  {editingPlan ? 'Update Plan' : 'Create Plan'}
                </Button>
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManagePlans;

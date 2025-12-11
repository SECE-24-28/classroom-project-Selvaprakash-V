import { useState, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';
import { FiSmartphone, FiTv, FiSearch, FiCalendar, FiWifi, FiInfo } from 'react-icons/fi';
import Layout from '../components/Layout';
import mobilePlansData from '../data/mobilePlans.json';
import dthPlansData from '../data/dthPlans.json';

const BrowsePlans = () => {
  const { setSelectedPlan } = useRecharge();
  const [allPlans, setAllPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [planType, setPlanType] = useState('mobile');

  useEffect(() => {
    const plans = planType === 'mobile' ? mobilePlansData : dthPlansData;
    setAllPlans(plans);
    setFilteredPlans(plans);
  }, [planType]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allPlans.filter(plan => {
        const searchLower = searchTerm.toLowerCase();
        return (
          plan.amount.toString().includes(searchLower) ||
          (plan.operator && plan.operator.toLowerCase().includes(searchLower)) ||
          (plan.provider && plan.provider.toLowerCase().includes(searchLower)) ||
          (plan.validity && plan.validity.toLowerCase().includes(searchLower))
        );
      });
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans(allPlans);
    }
  }, [searchTerm, allPlans]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    window.location.href = '/preview';
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Browse All Plans</h2>
          <p className="text-gray-500 dark:text-gray-400">Find the perfect plan for your needs</p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setPlanType('mobile')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition ${planType === 'mobile' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              <FiSmartphone className="w-5 h-5" />
              Mobile Plans
            </button>
            <button
              onClick={() => setPlanType('dth')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition ${planType === 'dth' ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              <FiTv className="w-5 h-5" />
              DTH Plans
            </button>
          </div>
          
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by operator, amount, or validity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition cursor-pointer group"
              onClick={() => handleSelectPlan(plan)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹{plan.amount}</h4>
                <span className="text-sm bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-lg font-medium">
                  {plan.operator || plan.provider}
                </span>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiCalendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{plan.validity}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiWifi className="w-4 h-4" />
                  <span className="text-sm">{plan.data || plan.channels}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-500 dark:text-gray-500">
                <FiInfo className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-xs">{plan.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-2xl mb-4">
              <FiSearch className="w-8 h-8" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">No plans found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BrowsePlans;

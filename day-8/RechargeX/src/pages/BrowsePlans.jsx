import { useState, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';
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
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Browse All Plans</h2>
      
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setPlanType('mobile')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${planType === 'mobile' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Mobile Plans
          </button>
          <button
            onClick={() => setPlanType('dth')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${planType === 'dth' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            DTH Plans
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search by operator, amount, or validity..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow hover:shadow-lg hover:border-orange-600 transition cursor-pointer"
            onClick={() => handleSelectPlan(plan)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-bold text-orange-600">₹{plan.amount}</h4>
              <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded font-semibold">
                {plan.operator || plan.provider}
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-1 font-medium">{plan.validity}</p>
            <p className="text-gray-700 text-sm mb-1">{plan.data || plan.channels}</p>
            <p className="text-gray-600 text-xs">{plan.description}</p>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <p className="text-center text-gray-700 mt-10 font-medium">No plans found matching your search.</p>
      )}
    </div>
  );
};

export default BrowsePlans;

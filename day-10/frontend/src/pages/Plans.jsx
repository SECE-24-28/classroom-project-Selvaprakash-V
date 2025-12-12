import { useState, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';
import { FiSmartphone, FiTv } from 'react-icons/fi';
import Layout from '../components/Layout';
import PlanCategory from '../components/PlanCategory';
import mobilePlansData from '../data/mobilePlans.json';
import dthPlansData from '../data/dthPlans.json';

const Plans = () => {
  const { operator, dthProvider, setSelectedPlan } = useRecharge();
  const [plans, setPlans] = useState([]);
  const [isDTH, setIsDTH] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    if (type === 'dth') {
      setIsDTH(true);
      const filtered = dthProvider 
        ? dthPlansData.filter(p => p.provider === dthProvider)
        : dthPlansData;
      setPlans(filtered);
    } else {
      const filtered = operator 
        ? mobilePlansData.filter(p => p.operator === operator)
        : mobilePlansData;
      setPlans(filtered);
    }
  }, [operator, dthProvider]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    window.location.href = '/preview';
  };

  const groupByCategory = () => {
    if (isDTH) return { 'DTH Plans': plans };
    
    const categories = {};
    plans.forEach(plan => {
      const cat = plan.category || 'other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(plan);
    });
    return categories;
  };

  const categorizedPlans = groupByCategory();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${isDTH ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400' : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'} rounded-2xl mb-4`}>
            {isDTH ? <FiTv className="w-8 h-8" /> : <FiSmartphone className="w-8 h-8" />}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isDTH ? 'DTH Plans' : 'Mobile Plans'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {isDTH ? (dthProvider || 'All Providers') : (operator || 'All Operators')}
          </p>
        </div>
        
        {Object.keys(categorizedPlans).map(category => (
          <PlanCategory
            key={category}
            title={category}
            plans={categorizedPlans[category]}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Plans;

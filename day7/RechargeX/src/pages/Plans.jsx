import { useState, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';
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
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">
        {isDTH ? `DTH Plans - ${dthProvider || 'All Providers'}` : `Mobile Plans - ${operator || 'All Operators'}`}
      </h2>
      {Object.keys(categorizedPlans).map(category => (
        <PlanCategory
          key={category}
          title={category}
          plans={categorizedPlans[category]}
          onSelectPlan={handleSelectPlan}
        />
      ))}
    </div>
  );
};

export default Plans;

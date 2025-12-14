import { FiCalendar, FiWifi } from 'react-icons/fi';

const RechargeCard = ({ plan, onSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition">
      <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-3">₹{plan.amount}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <FiCalendar className="w-4 h-4" />
          <span className="font-medium">Validity: {plan.validity}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <FiWifi className="w-4 h-4" />
          <span>Data: {plan.data}</span>
        </div>
      </div>
      <button
        onClick={() => onSelect(plan)}
        className="w-full bg-orange-600 text-white py-2.5 rounded-xl hover:bg-orange-700 transition font-semibold"
      >
        Select Plan
      </button>
    </div>
  );
};

export default RechargeCard;

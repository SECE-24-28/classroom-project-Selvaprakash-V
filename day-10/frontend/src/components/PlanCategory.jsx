import { FiCalendar, FiWifi, FiInfo } from 'react-icons/fi';

const PlanCategory = ({ title, plans, onSelectPlan }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 capitalize">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition cursor-pointer"
            onClick={() => onSelectPlan(plan)}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹{plan.amount}</h4>
              <span className="text-sm bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-lg font-medium">{plan.operator || plan.provider}</span>
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
    </div>
  );
};

export default PlanCategory;

const PlanCategory = ({ title, plans, onSelectPlan }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-black mb-4 capitalize">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow hover:shadow-lg hover:border-orange-600 transition cursor-pointer"
            onClick={() => onSelectPlan(plan)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-bold text-orange-600">₹{plan.amount}</h4>
              <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded font-semibold">{plan.operator || plan.provider}</span>
            </div>
            <p className="text-gray-700 text-sm mb-1 font-medium">{plan.validity}</p>
            <p className="text-gray-700 text-sm mb-1">{plan.data || plan.channels}</p>
            <p className="text-gray-600 text-xs">{plan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCategory;

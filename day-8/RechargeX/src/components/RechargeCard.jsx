const RechargeCard = ({ plan, onSelect }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow hover:shadow-lg hover:border-orange-600 transition">
      <h3 className="text-xl font-bold text-orange-600 mb-2">₹{plan.amount}</h3>
      <p className="text-gray-700 mb-1 font-medium">Validity: {plan.validity}</p>
      <p className="text-gray-700 mb-3">Data: {plan.data}</p>
      <button
        onClick={() => onSelect(plan)}
        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition font-semibold"
      >
        Select Plan
      </button>
    </div>
  );
};

export default RechargeCard;

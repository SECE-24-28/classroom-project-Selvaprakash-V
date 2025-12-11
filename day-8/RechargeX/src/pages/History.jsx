import { useRecharge } from '../context/RechargeContext';

const History = () => {
  const { transactions } = useRecharge();

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Transaction History</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-700 mb-4">No transactions yet</p>
          <a href="/recharge" className="text-orange-600 hover:text-orange-700 font-semibold transition">Make your first recharge</a>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-600">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-black">{transaction.type} Recharge</h3>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm font-semibold ${
                  transaction.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">{transaction.type === 'DTH' ? 'Customer ID' : 'Mobile Number'}</p>
                  <p className="font-semibold text-black">{transaction.number}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{transaction.type === 'DTH' ? 'Provider' : 'Operator'}</p>
                  <p className="font-semibold text-black">{transaction.operator}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Amount</p>
                  <p className="font-semibold text-orange-600 text-lg">₹{transaction.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Validity</p>
                  <p className="font-semibold text-black">{transaction.plan.validity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;

import { useRecharge } from '../context/RechargeContext';
import FormButton from '../components/FormButton';

const Preview = () => {
  const { phoneNumber, operator, circle, customerId, dthProvider, selectedPlan, addTransaction, resetRecharge } = useRecharge();

  const isDTH = !!customerId;

  const handleConfirm = () => {
    const transaction = {
      type: isDTH ? 'DTH' : 'Mobile',
      number: isDTH ? customerId : phoneNumber,
      operator: isDTH ? dthProvider : operator,
      circle: circle || 'N/A',
      plan: selectedPlan,
      amount: selectedPlan.amount,
      status: 'Success',
    };
    
    addTransaction(transaction);
    console.log('Recharge Successful', transaction);
    alert('Recharge Successful!');
    resetRecharge();
    window.location.href = '/history';
  };

  if (!selectedPlan) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl text-gray-600 mb-4">No plan selected</h2>
        <a href="/recharge" className="text-orange-500 hover:underline">Go to Recharge</a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6">Payment Preview</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
        <div className="mb-4">
          <p className="text-gray-600">{isDTH ? 'Customer ID' : 'Mobile Number'}</p>
          <p className="text-xl font-semibold text-black">{isDTH ? customerId : phoneNumber}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">{isDTH ? 'DTH Provider' : 'Operator'}</p>
          <p className="text-xl font-semibold text-black">{isDTH ? dthProvider : operator}</p>
        </div>
        {!isDTH && circle && (
          <div className="mb-4">
            <p className="text-gray-600">Circle</p>
            <p className="text-xl font-semibold text-black">{circle}</p>
          </div>
        )}
        <div className="mb-4">
          <p className="text-gray-600">Plan Amount</p>
          <p className="text-2xl font-bold text-orange-600">₹{selectedPlan.amount}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Validity</p>
          <p className="text-xl font-semibold text-black">{selectedPlan.validity}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">{isDTH ? 'Channels' : 'Data'}</p>
          <p className="text-xl font-semibold text-black">{selectedPlan.data || selectedPlan.channels}</p>
        </div>
        <div className="mb-6 p-4 bg-gray-900 rounded">
          <p className="text-sm text-gray-200">{selectedPlan.description}</p>
        </div>
        <FormButton variant="success" onClick={handleConfirm}>
          Confirm Recharge
        </FormButton>
      </div>
    </div>
  );
};

export default Preview;

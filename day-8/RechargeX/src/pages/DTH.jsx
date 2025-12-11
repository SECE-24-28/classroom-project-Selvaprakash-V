import { useRef, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';

const DTH = () => {
  const { customerId, setCustomerId, dthProvider, setDthProvider } = useRecharge();
  const customerIdRef = useRef(null);

  useEffect(() => {
    customerIdRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId) {
      alert('Please enter Customer ID');
      return;
    }
    if (!dthProvider) {
      alert('Please select DTH provider');
      return;
    }
    window.location.href = '/plans?type=dth';
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6">DTH Recharge</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
        <InputField
          label="Customer ID / Subscriber ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter your Customer ID"
          inputRef={customerIdRef}
        />
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Select DTH Provider</label>
          <select
            value={dthProvider}
            onChange={(e) => setDthProvider(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          >
            <option value="">Choose Provider</option>
            <option value="Tata Play">Tata Play</option>
            <option value="Airtel Digital TV">Airtel Digital TV</option>
            <option value="Dish TV">Dish TV</option>
            <option value="Sun Direct">Sun Direct</option>
          </select>
        </div>
        <FormButton type="submit">View DTH Plans</FormButton>
      </form>
    </div>
  );
};

export default DTH;

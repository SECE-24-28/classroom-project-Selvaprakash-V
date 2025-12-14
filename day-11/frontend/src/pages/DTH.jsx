import { useRef, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';
import { FiTv, FiUser } from 'react-icons/fi';
import Layout from '../components/Layout';
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
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-2xl mb-4">
            <FiTv className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">DTH Recharge</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Recharge your DTH connection instantly</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <InputField
            label="Customer ID / Subscriber ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter your Customer ID"
            inputRef={customerIdRef}
            icon={<FiUser className="w-5 h-5" />}
          />
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Select DTH Provider</label>
            <select
              value={dthProvider}
              onChange={(e) => setDthProvider(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
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
    </Layout>
  );
};

export default DTH;

import { useRecharge } from '../context/RechargeContext';
import { Link } from 'react-router-dom';
import { FiCreditCard, FiPhone, FiUser, FiMapPin, FiCalendar, FiWifi, FiInfo, FiCheckCircle } from 'react-icons/fi';
import Layout from '../components/Layout';
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
      amount: selectedPlan.Price || selectedPlan.amount,
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
      <Layout>
        <div className="text-center py-20 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-2xl mb-4">
            <FiCreditCard className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">No plan selected</h2>
          <Link to="/recharge" className="text-orange-600 hover:text-orange-700 font-medium hover:underline">Go to Recharge</Link>
        </div>
      </Layout>
    );
  }

  const planAmount = selectedPlan.Price || selectedPlan.amount;
  const planValidity = selectedPlan.Validity || selectedPlan.validity;
  const planData = selectedPlan.Data || selectedPlan.data;
  const planAddOns = selectedPlan.AddOns || selectedPlan.description;

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-2xl mb-4">
            <FiCreditCard className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Preview</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review your recharge details</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Amount Highlight */}
          <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">₹{planAmount}</p>
          </div>
          
          {/* Details Grid */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
                {isDTH ? <FiUser className="w-5 h-5" /> : <FiPhone className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{isDTH ? 'Customer ID' : 'Mobile Number'}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{isDTH ? customerId : phoneNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
                <FiWifi className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{isDTH ? 'DTH Provider' : 'Operator'}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{isDTH ? dthProvider : operator}</p>
              </div>
            </div>
            
            {!isDTH && circle && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Circle</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{circle}</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <FiCalendar className="w-4 h-4 text-orange-600" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Validity</p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{planValidity} Days</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <FiWifi className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">{isDTH ? 'Channels' : 'Data'}</p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{planData}{!isDTH && ' GB/Day'}</p>
              </div>
            </div>
          </div>
          
          {/* Add-ons/Description */}
          {planAddOns && (
            <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <FiInfo className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Add-ons & Benefits</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{planAddOns}</p>
            </div>
          )}
          
          <FormButton variant="success" onClick={handleConfirm} className="w-full">
            <FiCheckCircle className="w-5 h-5 mr-2" />
            Confirm Recharge
          </FormButton>
        </div>
      </div>
    </Layout>
  );
};

export default Preview;

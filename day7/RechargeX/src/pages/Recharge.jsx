import { useRef, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';

const Recharge = () => {
  const { phoneNumber, setPhoneNumber, operator, setOperator, circle, setCircle } = useRecharge();
  const phoneInputRef = useRef(null);

  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!operator) {
      alert('Please select an operator');
      return;
    }
    if (!circle) {
      alert('Please select a circle');
      return;
    }
    window.location.href = '/plans';
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6">Mobile Recharge</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
        <InputField
          label="Mobile Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter 10-digit number"
          inputRef={phoneInputRef}
        />
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Select Operator</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          >
            <option value="">Choose Operator</option>
            <option value="Airtel">Airtel</option>
            <option value="Jio">Jio</option>
            <option value="Vi">Vi</option>
            <option value="BSNL">BSNL</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Select Circle</label>
          <select
            value={circle}
            onChange={(e) => setCircle(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          >
            <option value="">Choose Circle</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>
        <FormButton type="submit">View Plans</FormButton>
      </form>
    </div>
  );
};

export default Recharge;

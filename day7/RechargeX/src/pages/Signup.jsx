import { useState } from 'react';
import { useRecharge } from '../context/RechargeContext';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';

const Signup = () => {
  const { setUser, setIsLoggedIn } = useRecharge();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && phone && password) {
      console.log('Signup attempt:', { name, email, phone, password });
      setUser({ name, email, phone });
      setIsLoggedIn(true);
      alert('Signup Successful!');
      window.location.href = '/';
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
        <InputField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <InputField
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
        <FormButton type="submit">Sign Up</FormButton>
        <p className="text-center mt-4 text-gray-700">
          Already have an account? <a href="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

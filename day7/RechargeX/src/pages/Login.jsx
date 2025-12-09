import { useState } from 'react';
import { useRecharge } from '../context/RechargeContext';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';

const Login = () => {
  const { setUser, setIsLoggedIn } = useRecharge();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Login attempt:', { email, password });
      setUser({ name: email.split('@')[0], email, phone: '' });
      setIsLoggedIn(true);
      alert('Login Successful!');
      window.location.href = '/';
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <FormButton type="submit">Login</FormButton>
        <p className="text-center mt-4 text-gray-700">
          Don't have an account? <a href="/signup" className="text-orange-600 hover:text-orange-700 font-semibold transition">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

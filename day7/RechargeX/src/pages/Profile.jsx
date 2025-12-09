import { useState } from 'react';
import { useRecharge } from '../context/RechargeContext';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';

const Profile = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useRecharge();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ name, email, phone });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: 'Guest User', email: 'user@example.com', phone: '' });
    alert('Logged out successfully!');
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl text-gray-700 mb-4">Please login to view profile</h2>
        <a href="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">My Profile</h2>
      
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
          <InputField
            label="Name"
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
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
          />
          <div className="flex gap-4">
            <FormButton type="submit">Save Changes</FormButton>
            <FormButton variant="secondary" onClick={() => setIsEditing(false)}>Cancel</FormButton>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-600">
          <div className="mb-4">
            <p className="text-gray-600">Name</p>
            <p className="text-xl font-semibold text-black">{user.name}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Email</p>
            <p className="text-xl font-semibold text-black">{user.email}</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">Phone</p>
            <p className="text-xl font-semibold text-black">{user.phone || 'Not provided'}</p>
          </div>
          <div className="space-y-3">
            <FormButton onClick={() => setIsEditing(true)}>Edit Profile</FormButton>
            <FormButton variant="secondary" onClick={handleLogout}>Logout</FormButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

import { useRecharge } from '../context/RechargeContext';

const Navbar = () => {
  const { isLoggedIn, user } = useRecharge();

  return (
    <nav className="bg-black text-white p-4 shadow-lg border-b-4 border-orange-600">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold hover:text-orange-500 transition">RechargeX</a>
        <div className="flex items-center space-x-6">
          <a href="/" className="hover:text-orange-500 transition font-medium">Home</a>
          <a href="/recharge" className="hover:text-orange-500 transition font-medium">Recharge</a>
          <a href="/dth" className="hover:text-orange-500 transition font-medium">DTH</a>
          <a href="/browse" className="hover:text-orange-500 transition font-medium">Browse</a>
          {isLoggedIn ? (
            <>
              <a href="/history" className="hover:text-orange-500 transition font-medium">History</a>
              <a href="/profile" className="hover:text-orange-500 transition font-medium">{user.name}</a>
            </>
          ) : (
            <a href="/login" className="hover:text-orange-500 transition font-medium">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

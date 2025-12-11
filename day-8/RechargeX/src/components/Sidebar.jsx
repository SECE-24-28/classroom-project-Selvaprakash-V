const Sidebar = () => {
  return (
    <aside className="bg-gray-900 p-4 w-64 min-h-screen hidden md:block border-r-4 border-orange-600">
      <h2 className="text-xl font-bold mb-4 text-orange-500">Quick Links</h2>
      <ul className="space-y-2">
        <li><a href="/" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">Home</a></li>
        <li><a href="/recharge" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">Mobile Recharge</a></li>
        <li><a href="/dth" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">DTH Recharge</a></li>
        <li><a href="/plans" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">Plans</a></li>
        <li><a href="/browse" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">Browse Plans</a></li>
        <li><a href="/history" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">History</a></li>
        <li><a href="/profile" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">Profile</a></li>
        <li><a href="/support" className="text-gray-300 hover:text-orange-500 hover:pl-2 block py-2 transition font-medium">Support</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

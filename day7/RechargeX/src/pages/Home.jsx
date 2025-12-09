const Home = () => {
  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Welcome to RechargeX</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">Fast, Easy, and Secure Recharge Platform</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
        <a href="/recharge" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition border-t-4 border-orange-600">
          <div className="text-4xl mb-3"></div>
          <h3 className="text-xl font-bold text-black mb-2">Mobile Recharge</h3>
          <p className="text-gray-700">Recharge your prepaid mobile instantly</p>
        </a>
        
        <a href="/dth" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition border-t-4 border-orange-600">
          <div className="text-4xl mb-3"></div>
          <h3 className="text-xl font-bold text-black mb-2">DTH Recharge</h3>
          <p className="text-gray-700">Recharge your DTH connection</p>
        </a>
        
        <a href="/browse" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition border-t-4 border-orange-600">
          <div className="text-4xl mb-3"></div>
          <h3 className="text-xl font-bold text-black mb-2">Browse Plans</h3>
          <p className="text-gray-700">Explore all available plans</p>
        </a>
      </div>

      <div className="bg-gray-900 p-8 rounded-lg max-w-2xl mx-auto border-l-4 border-orange-600">
        <h2 className="text-2xl font-bold text-white mb-4">Why Choose RechargeX?</h2>
        <ul className="text-left space-y-2 text-gray-300">
          <li>Instant recharge processing</li>
          <li>Multiple operators supported</li>
          <li>Secure transactions</li>
          <li>24/7 customer support</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

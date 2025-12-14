import { Link } from 'react-router-dom';
import { FiSmartphone, FiTv, FiList, FiZap, FiUsers, FiShield, FiHeadphones, FiArrowRight } from 'react-icons/fi';
import Layout from '../components/Layout';

const Home = () => {
  const features = [
    { icon: <FiZap className="w-6 h-6" />, title: 'Instant Processing', desc: 'Recharges complete in seconds' },
    { icon: <FiUsers className="w-6 h-6" />, title: 'All Operators', desc: 'Support for major networks' },
    { icon: <FiShield className="w-6 h-6" />, title: 'Secure Payments', desc: 'Bank-grade encryption' },
    { icon: <FiHeadphones className="w-6 h-6" />, title: '24/7 Support', desc: 'Always here to help' },
  ];

  return (
    <Layout>
      <div className="text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to <span className="text-orange-600">RechargeX</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fast, Easy, and Secure Recharge Platform for all your mobile and DTH needs
          </p>
        </div>
        
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Link to="/recharge" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <FiSmartphone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile Recharge</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Recharge your prepaid mobile instantly</p>
            <span className="inline-flex items-center text-orange-600 dark:text-orange-400 font-medium text-sm group-hover:gap-2 transition-all">
              Recharge Now <FiArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
          
          <Link to="/dth" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <FiTv className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">DTH Recharge</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Recharge your DTH connection</p>
            <span className="inline-flex items-center text-orange-600 dark:text-orange-400 font-medium text-sm group-hover:gap-2 transition-all">
              Recharge Now <FiArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
          
          <Link to="/browse" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <FiList className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Browse Plans</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Explore all available plans</p>
            <span className="inline-flex items-center text-orange-600 dark:text-orange-400 font-medium text-sm group-hover:gap-2 transition-all">
              View Plans <FiArrowRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl max-w-3xl mx-auto text-white">
          <h2 className="text-2xl font-bold mb-6">Why Choose RechargeX?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-orange-100">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

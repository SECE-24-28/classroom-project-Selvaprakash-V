import { useState, useEffect } from 'react';
import { RechargeProvider } from './context/RechargeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import FullScreenLayout from './components/FullScreenLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recharge from './pages/Recharge';
import DTH from './pages/DTH';
import Plans from './pages/Plans';
import BrowsePlans from './pages/BrowsePlans';
import Preview from './pages/Preview';
import History from './pages/History';
import Profile from './pages/Profile';
import Support from './pages/Support';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const path = window.location.pathname;
    const pageMap = {
      '/': 'home',
      '/login': 'login',
      '/signup': 'signup',
      '/recharge': 'recharge',
      '/dth': 'dth',
      '/plans': 'plans',
      '/browse': 'browse',
      '/preview': 'preview',
      '/history': 'history',
      '/profile': 'profile',
      '/support': 'support',
    };
    setCurrentPage(pageMap[path] || 'home');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'login': return <Login />;
      case 'signup': return <Signup />;
      case 'recharge': return <Recharge />;
      case 'dth': return <DTH />;
      case 'plans': return <Plans />;
      case 'browse': return <BrowsePlans />;
      case 'preview': return <Preview />;
      case 'history': return <History />;
      case 'profile': return <Profile />;
      case 'support': return <Support />;
      default: return <Home />;
    }
  };

  return (
    <RechargeProvider>
      <FullScreenLayout>
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">
            {renderPage()}
          </main>
        </div>
        <Footer />
      </FullScreenLayout>
    </RechargeProvider>
  );
}

export default App;

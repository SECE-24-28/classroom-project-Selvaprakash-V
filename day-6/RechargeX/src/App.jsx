import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Navbar />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="main-content">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
        
        <div className="hero-section">
          <h1>Welcome to RechargeX</h1>
          <p className="hero-subtitle">Your trusted partner for instant mobile recharge and bill payments</p>
          <div className="hero-actions">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        
        <div className="services-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">M</div>
              <h3>Mobile Recharge</h3>
              <p>Instant recharge for all major operators</p>
            </div>
            <div className="service-card">
              <div className="service-icon">D</div>
              <h3>DTH Recharge</h3>
              <p>Quick DTH recharge with exciting offers</p>
            </div>
            <div className="service-card">
              <div className="service-icon">B</div>
              <h3>Bill Payment</h3>
              <p>Pay all your utility bills in one place</p>
            </div>
            <div className="service-card">
              <div className="service-icon">O</div>
              <h3>Special Offers</h3>
              <p>Exclusive cashback and reward programs</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

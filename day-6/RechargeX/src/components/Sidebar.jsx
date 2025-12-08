import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#mobile-recharge">Mobile Recharge</a></li>
            <li><a href="#dth-recharge">DTH Recharge</a></li>
            <li><a href="#bill-payment">Bill Payment</a></li>
            <li><a href="#transactions">Transactions</a></li>
            <li><a href="#offers">Offers & Deals</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">U</div>
            <div className="user-info">
              <p className="user-name">User Account</p>
              <p className="user-email">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;

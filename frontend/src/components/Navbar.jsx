import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/products" className="brand-link">
            📦 Product Manager
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/products" className={isActive('/products')}>
            Products
          </Link>
          <Link to="/add-product" className={isActive('/add-product')}>
            Add Product
          </Link>
        </div>

        <div className="nav-user">
          <span className="user-info">
            Welcome, <strong>{user?.username}</strong>
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
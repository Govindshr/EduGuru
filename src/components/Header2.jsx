import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header2({ onContactClick , data}) {
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className={`mainHeader innerHeader ${isFixed ? 'fixed' : ''}`}>
      <nav className="navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand" style={{ cursor: 'pointer' }} onClick={handleLogoClick}>
            <img src="images/logo-white.svg" alt="EduGuru Logo" width="130" />
          </a>
          <a onClick={onContactClick} className="btn btn-success">
            Contact Us{' '}
            <i>
              <img src="images/arrow-green.svg" alt="Arrow" width="20" />
            </i>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header2;
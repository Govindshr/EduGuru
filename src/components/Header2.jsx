import React, { useEffect, useState } from 'react';

function Header2() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`mainHeader innerHeader ${isFixed ? 'fixed' : ''}`}>
      <nav className="navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            <img src="images/logo-white.svg" alt="EduGuru Logo" width="130" />
          </a>
          <a href="#" className="btn btn-success">
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

import React from 'react';
import '../Header/Header.css';
import company from '../../image/company.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={company} alt="Zoho Logo" className="header-logo" />
      </div>
      <p className='logoName'>DD BackStage</p>
      <nav className="header-nav">
        <Link to="/"><button className='headHome'>Home</button></Link>
        {/* <a href="#">Marketing Plus</a> */}
        <a href="#">Bigin</a>
        <a href="#">Mail</a>
        <a href="#">Social</a>
        <a href="#">Survey</a>
        <a href="#">Meeting</a>
        <div className="dropdown">
          <button className="dropbtn">All Products</button>
          <div className="dropdown-content">
            <a href="#">Product 1</a>
            <a href="#">Product 2</a>
            <a href="#">Product 3</a>
          </div>
        </div>
      </nav>
      <div className="header-right">
        {/* <a href="#"><i className="search-icon"></i></a>
        <a href="#"><i className="globe-icon"></i> English</a> */}
        <Link to="/login"><button className='logSignHeader'>SIGN IN</button></Link>
        <Link to="/register"><button className='get-started'>GET STARTED</button></Link>
      </div>
    </header>
  );
};

export default Header;

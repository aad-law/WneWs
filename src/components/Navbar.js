// Navbar.js - Updated with React Router Links and Dark Mode Toggle
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle ';

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top mode-adaptive-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">W-News</Link>

            {/* 👇 Keep DarkModeToggle OUTSIDE collapse and align right */}
            <div className="d-flex d-lg-none ms-auto me-2">
              <DarkModeToggle />
            </div>

            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/general">General</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">Technology</Link>
                </li>
              </ul>

              {/* 👇 Show DarkModeToggle here on large screens*/}
              <div className="d-none d-lg-block">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
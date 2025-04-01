import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  // Initialize from localStorage or default to false (light mode)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    // Apply dark mode on initial load and changes
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="form-check form-switch ms-auto me-3 d-flex align-items-center">
      <input 
        className="form-check-input me-2" 
        type="checkbox" 
        id="darkModeToggle" 
        checked={darkMode} 
        onChange={toggleDarkMode}
      />
      <label className="form-check-label" htmlFor="darkModeToggle">
        {darkMode ? '🌙' : '☀️'}
      </label>
    </div>
  );
};

export default DarkModeToggle;
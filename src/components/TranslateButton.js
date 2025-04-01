import React, { useState, useEffect } from 'react';

const TranslationButton = () => {
  // Initialize from localStorage or default to false (not translated)
  const [isTranslated, setIsTranslated] = useState(() => {
    const savedTranslation = localStorage.getItem('isTranslated');
    return savedTranslation === 'true';
  });

  useEffect(() => {
    // Apply translation state on initial load and changes
    if (isTranslated) {
      document.body.classList.add('translated');
      // You can add additional translation logic here
    } else {
      document.body.classList.remove('translated');
    }
    
    // Save preference to localStorage
    localStorage.setItem('isTranslated', isTranslated);
  }, [isTranslated]);

  const toggleTranslation = () => {
    setIsTranslated(!isTranslated);
  };

  return (
    <div className="ms-2 d-flex align-items-center">
      <button 
        className="btn btn-sm btn-outline-secondary" 
        onClick={toggleTranslation}
        title={isTranslated ? "View original content" : "Translate content"}
      >
        {isTranslated ? 'Original' : 'Translate'} <span className="ms-1">🌐</span>
      </button>
    </div>
  );
};

export default TranslationButton;
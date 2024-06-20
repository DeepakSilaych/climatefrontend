// components/Arrow.jsx
import React, { useState } from 'react';
import './Arrow.css';

const Arrow = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
    setIsAtBottom(!isAtBottom);
  };

  return (
    <div className="arrow-container" onClick={handleClick}>
      <div className={`arrow ${isAtBottom ? 'arrow-up' : 'arrow-down'}`}></div>
    </div>
  );
};

export default Arrow;

// Fix: Created a valid React component to resolve parsing errors.
import React from 'react';

const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  return (
    <header style={headerStyle}>
      <h1>F1 Manager Sim</h1>
    </header>
  );
};

export default Header;

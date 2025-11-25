import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
    borderBottom: '2px solid #22d3ee',
  };

  return (
    <header style={headerStyle}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ margin: '0.25rem 0 0', color: '#cbd5e1' }}>{subtitle}</p>}
    </header>
  );
};

export default Header;

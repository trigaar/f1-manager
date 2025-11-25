// Fix: Created a valid React component to resolve parsing errors.
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '16px',
    backgroundColor: '#fff',
  };

  const titleStyle: React.CSSProperties = {
    marginTop: 0,
    marginBottom: '16px',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px'
  };

  return (
    <div style={cardStyle}>
      {title && <h3 style={titleStyle}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

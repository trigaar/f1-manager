// Fix: Created a valid React component to resolve parsing errors.
import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = '#4caf50' }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    height: '10px',
  };

  const fillerStyle: React.CSSProperties = {
    height: '100%',
    width: `${value}%`,
    backgroundColor: color,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.2s ease-in-out',
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
    </div>
  );
};

export default ProgressBar;

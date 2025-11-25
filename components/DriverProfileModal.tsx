// Fix: Created a valid React component to resolve parsing errors.
import React from 'react';
import { Driver } from '../types';

interface DriverProfileModalProps {
  driver: Driver | null;
  onClose: () => void;
}

const DriverProfileModal: React.FC<DriverProfileModalProps> = ({ driver, onClose }) => {
  if (!driver) return null;

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1000,
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  };


  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h2>{driver.name}</h2>
        <p>Skill: {driver.skill}</p>
        <p>Consistency: {driver.consistency}</p>
        <p>Aggression: {driver.aggression}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default DriverProfileModal;

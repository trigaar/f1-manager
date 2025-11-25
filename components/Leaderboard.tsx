// Fix: Created a valid React component to resolve parsing errors.
import React from 'react';
import { CarState } from '../types';
import Card from './ui/Card';

const sampleCars: CarState[] = [
    { driverId: 'VER', position: 1, lap: 5, gap: 'Interval', tyres: { compound: 'medium', wear: 20 }, status: 'on-track', lapTimes: [] },
    { driverId: 'LEC', position: 2, gap: '+1.5s', lap: 5, tyres: { compound: 'medium', wear: 21 }, status: 'on-track', lapTimes: [] },
    { driverId: 'HAM', position: 3, gap: '+3.2s', lap: 5, tyres: { compound: 'hard', wear: 15 }, status: 'on-track', lapTimes: [] },
];

const Leaderboard: React.FC = () => {
  const cars = sampleCars; // In a real app, this would come from props or state

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 2fr',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid #eee'
  }

  return (
    <Card title="Leaderboard">
      <div>
        <div style={{...rowStyle, fontWeight: 'bold'}}>
            <span>Pos</span>
            <span>Driver</span>
            <span>Gap</span>
        </div>
        {cars.map(car => (
          <div key={car.driverId} style={rowStyle}>
            <span>{car.position}</span>
            <span>{car.driverId}</span>
            <span>{car.gap}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Leaderboard;

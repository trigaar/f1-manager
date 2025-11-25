import React from 'react';
import Card from './ui/Card';
import { CarState, Driver, Team } from '../types';

interface TrackDisplayProps {
  cars: CarState[];
  drivers: Driver[];
  teams: Team[];
  lap: number;
  totalLaps: number;
}

const TrackDisplay: React.FC<TrackDisplayProps> = ({ cars, drivers, teams, lap, totalLaps }) => {
  const driverMap = new Map(drivers.map((driver) => [driver.id, driver]));
  const teamMap = new Map(teams.map((team) => [team.id, team]));

  return (
    <Card title="Track Overview">
      <div
        style={{
          width: '100%',
          height: '420px',
          background: 'radial-gradient(circle at 20% 20%, #e0f2fe, #e2e8f0)',
          border: '1px solid #cbd5e1',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            border: '3px dashed #334155',
            borderRadius: '40% 60% 55% 45% / 45% 40% 60% 55%',
            opacity: 0.5,
          }}
        />
        {cars.map((car) => {
          const driver = driverMap.get(car.driverId);
          const team = driver ? teamMap.get(driver.teamId) : undefined;
          const completion = Math.min(1, car.lap / totalLaps);
          const angle = (car.position / cars.length) * Math.PI * 2;
          const radiusX = 40 + completion * 10;
          const radiusY = 35 + completion * 10;
          const x = 50 + Math.cos(angle) * radiusX;
          const y = 50 + Math.sin(angle) * radiusY;

          return (
            <div
              key={car.driverId}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fff',
                padding: '6px 8px',
                borderRadius: '999px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                border: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: team?.color ?? '#475569',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontWeight: 700 }}>{driver?.id ?? car.driverId}</span>
              <span style={{ color: '#475569', fontSize: '0.85rem' }}>P{car.position}</span>
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(255,255,255,0.9)',
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontWeight: 600,
            color: '#334155',
          }}
        >
          Lap {lap} / {totalLaps}
        </div>
      </div>
    </Card>
  );
};

export default TrackDisplay;

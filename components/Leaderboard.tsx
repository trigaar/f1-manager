import React from 'react';
import { CarState, Driver, Team } from '../types';
import Card from './ui/Card';

interface LeaderboardProps {
  cars: CarState[];
  drivers: Driver[];
  teams: Team[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ cars, drivers, teams }) => {
  const driverMap = new Map(drivers.map((driver) => [driver.id, driver]));
  const teamMap = new Map(teams.map((team) => [team.id, team]));

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '0.5fr 2fr 1fr 1fr',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid #eee',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 600,
  };

  return (
    <Card title="Leaderboard">
      <div>
        <div style={{ ...rowStyle, fontWeight: 'bold', background: '#f8fafc' }}>
          <span>Pos</span>
          <span>Driver</span>
          <span>Tyres</span>
          <span>Gap</span>
        </div>
        {cars.map((car) => {
          const driver = driverMap.get(car.driverId);
          const team = driver ? teamMap.get(driver.teamId) : undefined;
          return (
            <div key={car.driverId} style={rowStyle}>
              <span>{car.position}</span>
              <span style={badgeStyle}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: team?.color ?? '#94a3b8',
                  }}
                />
                {driver?.name ?? car.driverId}
              </span>
              <span>{car.tyres.compound} ({car.tyres.wear}% wear)</span>
              <span>{car.gap}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Leaderboard;

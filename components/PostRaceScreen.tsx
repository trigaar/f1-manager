// Fix: Replaced invalid content with a valid React component.
import React, { useMemo } from 'react';
import { Driver, RaceSession, Team } from '../types';
import Card from './ui/Card';

interface PostRaceScreenProps {
  session: RaceSession;
  drivers: Driver[];
  teams: Team[];
  raceNumber: number;
  totalRaces: number;
  onNextRace: () => void;
  onRestartRace: () => void;
}

const PostRaceScreen: React.FC<PostRaceScreenProps> = ({
  session,
  drivers,
  teams,
  raceNumber,
  totalRaces,
  onNextRace,
  onRestartRace,
}) => {
  const orderedCars = useMemo(() => [...session.cars].sort((a, b) => a.position - b.position), [session.cars]);
  const winnerCar = orderedCars[0];
  const winnerDriver = drivers.find((driver) => driver.id === winnerCar?.driverId);
  const winnerTeam = winnerDriver ? teams.find((team) => team.id === winnerDriver.teamId) : undefined;

  const fastestLap = useMemo(() => {
    return session.cars
      .flatMap((car) => car.lapTimes.map((time, index) => ({ car, time, lapNumber: index + 1 })))
      .reduce<{ car: (typeof session.cars)[number]; time: number; lapNumber: number } | null>((best, entry) => {
        if (!best || entry.time < best.time) {
          return entry;
        }
        return best;
      }, null);
  }, [session.cars]);

  const fastestDriver = fastestLap ? drivers.find((driver) => driver.id === fastestLap.car.driverId) : undefined;

  const buttonStyle: React.CSSProperties = {
    padding: '12px 18px',
    borderRadius: '10px',
    border: 'none',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div style={{ background: '#0f172a', minHeight: '70vh', borderRadius: 12, padding: '24px', color: '#e2e8f0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>2025 Season — Race {raceNumber} of {totalRaces}</p>
          <h1 style={{ margin: '4px 0 0', color: '#f8fafc' }}>Race Concludes After Thrilling Battle</h1>
          <p style={{ margin: '6px 0 0', color: '#cbd5e1' }}>AI-Generated Race Analysis</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" style={{ ...buttonStyle, background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155' }} onClick={onRestartRace}>
            Replay Race
          </button>
          <button type="button" style={{ ...buttonStyle, background: '#f43f5e', color: '#fff' }} onClick={onNextRace}>
            Proceed to Next Race
          </button>
        </div>
      </header>

      <Card title="Race Summary">
        <p style={{ margin: 0, color: '#1e293b', background: '#f8fafc', padding: '16px', borderRadius: '10px' }}>
          The race was filled with action from start to finish. The winner controlled the pace from the front, while battles raged
          throughout the midfield. A late safety car bunched up the pack, but the leader held on for a well-deserved victory.
        </p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 16 }}>
        <Card title="Top 5 Finishers">
          <ol style={{ paddingLeft: 18, margin: 0 }}>
            {orderedCars.slice(0, 5).map((car) => {
              const driver = drivers.find((item) => item.id === car.driverId);
              const team = driver ? teams.find((entry) => entry.id === driver.teamId) : undefined;
              return (
                <li key={car.driverId} style={{ marginBottom: 8, fontWeight: 600 }}>
                  <span>{driver?.name ?? car.driverId}</span>
                  {team && <span style={{ color: '#64748b', marginLeft: 8 }}>({team.name})</span>}
                </li>
              );
            })}
          </ol>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card title="Winner">
            <p style={{ margin: '0 0 6px', fontWeight: 700 }}>{winnerDriver?.name ?? 'Unknown'}</p>
            <p style={{ margin: 0, color: '#64748b' }}>{winnerTeam?.name ?? 'Team TBC'}</p>
          </Card>
          <Card title="Fastest Lap">
            {fastestLap ? (
              <div>
                <p style={{ margin: '0 0 6px', fontWeight: 700 }}>{fastestDriver?.name ?? fastestLap.car.driverId}</p>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Lap {fastestLap.lapNumber} — {fastestLap.time.toFixed(2)}s
                </p>
              </div>
            ) : (
              <p style={{ margin: 0, color: '#64748b' }}>No lap data available.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostRaceScreen;

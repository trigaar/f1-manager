import React from 'react';
import Leaderboard from './Leaderboard';
import TrackDisplay from './TrackDisplay';
import RaceLog from './RaceLog';
import RaceInfo from './RaceInfo';
import RaceControls from './RaceControls';
import { Driver, RaceEvent, RaceSession, Team } from '../types';

interface RaceHubProps {
  session: RaceSession;
  drivers: Driver[];
  teams: Team[];
  events: RaceEvent[];
  isRunning: boolean;
  simSpeed: number;
  onToggle: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (value: number) => void;
}

const RaceHub: React.FC<RaceHubProps> = ({
  session,
  drivers,
  teams,
  events,
  isRunning,
  simSpeed,
  onToggle,
  onStep,
  onReset,
  onSpeedChange,
}) => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: 20 }}>
        <RaceInfo session={session} />
        <RaceControls
          lap={session.lap}
          totalLaps={session.totalLaps}
          isRunning={isRunning}
          simSpeed={simSpeed}
          onToggle={onToggle}
          onStep={onStep}
          onReset={onReset}
          onSpeedChange={onSpeedChange}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Leaderboard cars={session.cars} drivers={drivers} teams={teams} />
          <RaceLog events={events} />
        </div>
        <div>
          <TrackDisplay cars={session.cars} drivers={drivers} teams={teams} lap={session.lap} totalLaps={session.totalLaps} />
        </div>
      </div>
    </div>
  );
};

export default RaceHub;

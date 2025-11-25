// Fix: Created a valid React component to resolve parsing errors.
import React from 'react';
import Leaderboard from './Leaderboard';
import TrackDisplay from './TrackDisplay';
import RaceLog from './RaceLog';
import RaceInfo from './RaceInfo';

const RaceHub: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <RaceInfo />
          <Leaderboard />
          <RaceLog />
        </div>
        <div>
          <TrackDisplay />
        </div>
      </div>
    </div>
  );
};

export default RaceHub;

import React from 'react';
import Card from './ui/Card';
import { RaceSession } from '../types';

interface RaceInfoProps {
  session: RaceSession;
}

const RaceInfo: React.FC<RaceInfoProps> = ({ session }) => {
  const progress = Math.round((session.lap / session.totalLaps) * 100);

  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    background: '#e2e8f0',
    color: '#0f172a',
    fontSize: '0.85rem',
    marginRight: '8px',
  };

  return (
    <Card title="Race Information">
      <p style={{ margin: '0 0 8px' }}><strong>Track:</strong> {session.trackName}</p>
      <p style={{ margin: '0 0 8px' }}><strong>Lap:</strong> {session.lap} / {session.totalLaps} ({progress}%)</p>
      <p style={{ margin: '0 0 12px' }}><strong>Weather:</strong> {session.weather === 'dry' ? 'Dry' : 'Wet'}</p>
      <div style={{ background: '#e5e7eb', borderRadius: '8px', overflow: 'hidden', height: '12px' }}>
        <div style={{ width: `${progress}%`, background: '#22c55e', height: '100%' }} aria-label="lap progress" />
      </div>
      <div style={{ marginTop: '12px' }}>
        <span style={pillStyle}>ERS balanced</span>
        <span style={pillStyle}>Fuel target: +0.2 laps</span>
        <span style={pillStyle}>Tyre offset: +1 lap</span>
      </div>
    </Card>
  );
};

export default RaceInfo;

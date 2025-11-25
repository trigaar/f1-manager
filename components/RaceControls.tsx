import React from 'react';
import Card from './ui/Card';

interface RaceControlsProps {
  lap: number;
  totalLaps: number;
  isRunning: boolean;
  simSpeed: number;
  onToggle: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (value: number) => void;
}

const RaceControls: React.FC<RaceControlsProps> = ({
  lap,
  totalLaps,
  isRunning,
  simSpeed,
  onToggle,
  onStep,
  onReset,
  onSpeedChange,
}) => {
  const buttonStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: '#0ea5e9',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
  };

  const secondaryButton: React.CSSProperties = {
    ...buttonStyle,
    background: '#fff',
    color: '#0f172a',
  };

  return (
    <Card title="Race Controls">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={onToggle} style={buttonStyle} aria-label={isRunning ? 'Pause race' : 'Start race'}>
            {isRunning ? 'Pause' : lap === totalLaps ? 'Restart' : 'Start'}
          </button>
          <button onClick={onStep} style={secondaryButton} aria-label="Advance one lap">
            Step +1 lap
          </button>
          <button onClick={onReset} style={secondaryButton} aria-label="Reset session">
            Reset session
          </button>
          <span style={{ fontWeight: 700, color: '#0f172a' }}>
            Lap {lap} / {totalLaps}
          </span>
        </div>
        <div>
          <label style={{ fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: 6 }} htmlFor="speed-control">
            Simulation speed: {simSpeed.toFixed(1)}x
          </label>
          <input
            id="speed-control"
            type="range"
            min={0.5}
            max={3}
            step={0.1}
            value={simSpeed}
            onChange={(event) => onSpeedChange(parseFloat(event.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </Card>
  );
};

export default RaceControls;

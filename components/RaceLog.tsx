import React from 'react';
import Card from './ui/Card';
import { RaceEvent } from '../types';

interface RaceLogProps {
  events: RaceEvent[];
}

const severityColor: Record<NonNullable<RaceEvent['severity']>, string> = {
  info: '#0ea5e9',
  warning: '#f97316',
  critical: '#ef4444',
};

const RaceLog: React.FC<RaceLogProps> = ({ events }) => {
  return (
    <Card title="Race Log">
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px' }}>
        {events.map((event) => {
          const color = event.severity ? severityColor[event.severity] : '#64748b';
          return (
            <li
              key={event.id}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 700, color }}>Lap {event.lap}</span>
              <span>{event.message}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default RaceLog;

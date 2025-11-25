// Fix: Created a valid React component to resolve parsing errors.
import React from 'react';
import RaceHub from '../RaceHub';

const RaceWeekendScreen: React.FC = () => {
  return (
    <div>
      <h2>Race Weekend</h2>
      <RaceHub />
    </div>
  );
};

export default RaceWeekendScreen;

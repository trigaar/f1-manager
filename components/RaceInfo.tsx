// Fix: Replaced invalid content with a valid React component.
import React from 'react';

const RaceInfo: React.FC = () => {
  return (
    <div>
      <h3>Race Info</h3>
      <p>Track: Silverstone</p>
      <p>Laps: 5/52</p>
    </div>
  );
};

export default RaceInfo;

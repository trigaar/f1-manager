// Fix: Replaced invalid content with a valid React component.
import React from 'react';
import { Driver } from '../types';

// Sample driver for display purposes
const sampleDriver: Driver = {
    id: '1',
    name: 'Max Verstappen',
    teamId: 'redbull',
    skill: 95,
    consistency: 98,
    aggression: 90
};


const DriverProfile: React.FC<{ driver?: Driver }> = ({ driver = sampleDriver }) => {
  return (
    <div>
      <h3>Driver Profile: {driver.name}</h3>
      <ul>
        <li>Skill: {driver.skill}</li>
        <li>Consistency: {driver.consistency}</li>
        <li>Aggression: {driver.aggression}</li>
      </ul>
    </div>
  );
};

export default DriverProfile;

// Fix: Created a valid React component to resolve parsing errors.
import React from 'react';

interface TeamSelectionScreenProps {
  onTeamSelected: (teamId: string) => void;
}

const TeamSelectionScreen: React.FC<TeamSelectionScreenProps> = ({ onTeamSelected }) => {
  return (
    <div>
      <h2>Select Your Team</h2>
      <p>Team selection UI goes here.</p>
      <button onClick={() => onTeamSelected('ferrari')}>Select Ferrari</button>
    </div>
  );
};

export default TeamSelectionScreen;

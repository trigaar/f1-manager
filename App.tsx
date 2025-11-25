// Fix: Created a valid React component to serve as the application entry point.
import React from 'react';
import Header from './components/Header';
import RaceHub from './components/RaceHub';

const App: React.FC = () => {
  return (
    <div className="app-container" style={{ fontFamily: 'sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '1rem' }}>
        <RaceHub />
      </main>
    </div>
  );
};

export default App;

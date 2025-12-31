import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import RaceHub from './components/RaceHub';
import PostRaceScreen from './components/PostRaceScreen';
import { CarState, Driver, RaceEvent, RaceSession, Team } from './types';

const teams: Team[] = [
  { id: 'RED', name: 'Red Titan Racing', color: '#d90429', performance: 95 },
  { id: 'MER', name: 'Silver Arrows', color: '#00b2a9', performance: 92 },
  { id: 'FRA', name: 'Prancing Horse', color: '#e10600', performance: 90 },
];

const drivers: Driver[] = [
  { id: 'VER', name: 'Max Verstappen', teamId: 'RED', skill: 98, consistency: 95, aggression: 92 },
  { id: 'PER', name: 'Sergio Perez', teamId: 'RED', skill: 90, consistency: 88, aggression: 85 },
  { id: 'HAM', name: 'Lewis Hamilton', teamId: 'MER', skill: 95, consistency: 93, aggression: 90 },
  { id: 'RUS', name: 'George Russell', teamId: 'MER', skill: 91, consistency: 90, aggression: 87 },
  { id: 'LEC', name: 'Charles Leclerc', teamId: 'FRA', skill: 94, consistency: 91, aggression: 89 },
];

const baseRaceCars: CarState[] = [
  { driverId: 'VER', position: 1, lap: 17, gap: 'Interval', tyres: { compound: 'medium', wear: 12 }, status: 'on-track', lapTimes: [93.2, 93.0, 93.1] },
  { driverId: 'LEC', position: 2, lap: 17, gap: '+1.8s', tyres: { compound: 'medium', wear: 14 }, status: 'on-track', lapTimes: [93.8, 93.6, 93.9] },
  { driverId: 'HAM', position: 3, lap: 17, gap: '+4.4s', tyres: { compound: 'hard', wear: 8 }, status: 'on-track', lapTimes: [94.1, 94.0, 93.9] },
  { driverId: 'PER', position: 4, lap: 17, gap: '+6.2s', tyres: { compound: 'medium', wear: 15 }, status: 'on-track', lapTimes: [94.2, 94.0, 94.1] },
  { driverId: 'RUS', position: 5, lap: 17, gap: '+8.5s', tyres: { compound: 'hard', wear: 9 }, status: 'on-track', lapTimes: [94.4, 94.2, 94.3] },
];

const initialRaceSession: RaceSession = {
  trackName: 'Bahrain International Circuit',
  totalLaps: 57,
  lap: 17,
  cars: baseRaceCars,
  weather: 'dry',
};

const initialRaceEvents: RaceEvent[] = [
  { id: 'evt-1', lap: 17, message: 'LEC sets fastest lap: 1:33.428' },
  { id: 'evt-2', lap: 16, message: 'PER overtakes RUS into Turn 1' },
  { id: 'evt-3', lap: 15, message: 'DRS enabled as detection laps completed' },
  { id: 'evt-4', lap: 12, message: 'HAM reports light rear locking under braking', severity: 'warning' },
];

const createFreshSession = (): RaceSession => ({
  ...initialRaceSession,
  cars: initialRaceSession.cars.map((car) => ({
    ...car,
    tyres: { ...car.tyres },
    lapTimes: [...car.lapTimes],
  })),
});

const TOTAL_RACES = 14;

const App: React.FC = () => {
  const [session, setSession] = useState<RaceSession>(() => createFreshSession());
  const [events, setEvents] = useState<RaceEvent[]>(initialRaceEvents);
  const [isRunning, setIsRunning] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);
  const [currentRace, setCurrentRace] = useState(1);
  const [isPostRace, setIsPostRace] = useState(false);

  const bestLapRef = useRef<number | null>(null);
  const eventIdRef = useRef(initialRaceEvents.length + 1);

  const driverMap = useMemo(() => new Map(drivers.map((driver) => [driver.id, driver])), []);
  const teamMap = useMemo(() => new Map(teams.map((team) => [team.id, team])), []);

  const appendEvents = useCallback((items: Omit<RaceEvent, 'id'>[]) => {
    if (!items.length) return;
    setEvents((prev) => {
      const newEvents = items.map((item) => ({ ...item, id: `evt-${eventIdRef.current++}` }));
      const merged = [...newEvents, ...prev];
      return merged.slice(0, 40);
    });
  }, []);

  const advanceLap = useCallback(() => {
    let generatedEvents: Omit<RaceEvent, 'id'>[] = [];
    let finishedRace = false;

    setSession((prev) => {
      if (prev.lap >= prev.totalLaps) {
        finishedRace = true;
        return prev;
      }

      const nextLap = prev.lap + 1;

      const updatedCars: CarState[] = prev.cars.map((car) => {
        const driver = driverMap.get(car.driverId);
        const team = driver ? teamMap.get(driver.teamId) : undefined;
        const base = 94 - (driver?.skill ? (driver.skill - 90) * 0.08 : 0);
        const stabilityBonus = driver?.consistency ? (driver.consistency - 90) * -0.04 : 0;
        const teamDelta = team ? (100 - team.performance) * 0.04 : 3;
        const wearPenalty = car.tyres.wear * 0.06;
        const aggressionBoost = driver ? (driver.aggression - 85) * -0.02 : 0;
        const randomness = (Math.random() - 0.5) * 1.2;

        const lapTime = Math.max(90, base + teamDelta + wearPenalty + aggressionBoost + stabilityBonus + randomness);
        const newWear = Math.min(100, car.tyres.wear + 2 + Math.random() * 1.8);

        if (newWear >= 86) {
          generatedEvents.push({
            lap: nextLap,
            message: `${driver?.name ?? car.driverId} reports tyre wear at ${newWear.toFixed(0)}%`,
            severity: 'warning',
          });
        }

        return {
          ...car,
          lap: nextLap,
          lapTimes: [...car.lapTimes, lapTime],
          tyres: { ...car.tyres, wear: newWear },
        };
      });

      const sortedCars = [...updatedCars].sort((a, b) => {
        const aLap = a.lapTimes[a.lapTimes.length - 1];
        const bLap = b.lapTimes[b.lapTimes.length - 1];
        const stability = (a.position - b.position) * 0.12;
        return aLap + stability - (bLap - stability);
      });

      const leaderLapTime = sortedCars[0].lapTimes[sortedCars[0].lapTimes.length - 1];
      const positionedCars = sortedCars.map((car, index) => {
        const lastLap = car.lapTimes[car.lapTimes.length - 1];
        const gap = index === 0 ? 'Interval' : `+${Math.max(0, lastLap - leaderLapTime).toFixed(1)}s`;
        return { ...car, position: index + 1, gap };
      });

      const fastestLapCar = positionedCars.reduce((fastest, car) => {
        const lastLap = car.lapTimes[car.lapTimes.length - 1];
        if (!fastest) return car;
        const fastestLap = fastest.lapTimes[fastest.lapTimes.length - 1];
        return lastLap < fastestLap ? car : fastest;
      }, positionedCars[0]);

      const fastestLap = fastestLapCar.lapTimes[fastestLapCar.lapTimes.length - 1];
      if (bestLapRef.current === null || fastestLap < bestLapRef.current) {
        bestLapRef.current = fastestLap;
        const driver = driverMap.get(fastestLapCar.driverId);
        generatedEvents.push({
          lap: nextLap,
          message: `${driver?.name ?? fastestLapCar.driverId} sets fastest lap: ${(fastestLap / 60).toFixed(2)}m`,
          severity: 'info',
        });
      }

      if (nextLap >= prev.totalLaps) {
        finishedRace = true;
        generatedEvents.push({ lap: nextLap, message: 'Chequered flag! Race finished.', severity: 'info' });
      }

      return { ...prev, lap: nextLap, cars: positionedCars };
    });

    if (generatedEvents.length) {
      appendEvents(generatedEvents);
    }

    if (finishedRace) {
      setIsRunning(false);
      setIsPostRace(true);
    }
  }, [appendEvents, driverMap, teamMap]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => advanceLap(), Math.max(300, 1400 / simSpeed));
    return () => clearInterval(interval);
  }, [advanceLap, isRunning, simSpeed]);

  const resetSessionState = useCallback((options?: { advanceRace?: boolean; autoStart?: boolean }) => {
    bestLapRef.current = null;
    eventIdRef.current = initialRaceEvents.length + 1;
    setSession(createFreshSession());
    setEvents(initialRaceEvents);
    setIsPostRace(false);

    if (options?.advanceRace) {
      setCurrentRace((prev) => (prev >= TOTAL_RACES ? prev : prev + 1));
    }

    setIsRunning(Boolean(options?.autoStart));
  }, []);

  const handleReset = useCallback(() => {
    resetSessionState({ autoStart: false });
  }, [resetSessionState]);

  const handleProceedToNextRace = useCallback(() => {
    resetSessionState({ advanceRace: true, autoStart: false });
  }, [resetSessionState]);

  const handleToggle = useCallback(() => {
    if (isPostRace || session.lap >= session.totalLaps) {
      resetSessionState({ advanceRace: true, autoStart: true });
      return;
    }
    setIsRunning((prev) => !prev);
  }, [isPostRace, resetSessionState, session.lap, session.totalLaps]);

  return (
    <div className="app-container" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f0f2f5', minHeight: '100vh' }}>
      <Header title="F1 Manager Simulation" subtitle={isPostRace ? `Season progress — Race ${currentRace} of ${TOTAL_RACES}` : 'Live race control'} />
      <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {isPostRace ? (
          <PostRaceScreen
            session={session}
            drivers={drivers}
            teams={teams}
            raceNumber={currentRace}
            totalRaces={TOTAL_RACES}
            onNextRace={handleProceedToNextRace}
            onRestartRace={handleReset}
          />
        ) : (
          <RaceHub
            session={session}
            drivers={drivers}
            teams={teams}
            events={events}
            isRunning={isRunning}
            simSpeed={simSpeed}
            onToggle={handleToggle}
            onStep={advanceLap}
            onReset={handleReset}
            onSpeedChange={setSimSpeed}
          />
        )}
      </main>
    </div>
  );
};

export default App;

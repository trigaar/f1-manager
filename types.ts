// Fix: Added type definitions to make the file a valid module.
export interface Driver {
  id: string;
  name: string;
  teamId: string;
  skill: number;
  consistency: number;
  aggression: number;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  performance: number;
}

export type TyreCompound = 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';

export interface Tyre {
  compound: TyreCompound;
  wear: number; // 0-100
}

export interface CarState {
  driverId: string;
  position: number;
  lap: number;
  gap: string; // e.g., "+1.234s" or "Interval"
  tyres: Tyre;
  status: 'on-track' | 'pitting' | 'retired';
  lapTimes: number[];
}

export interface RaceSession {
  trackName: string;
  totalLaps: number;
  lap: number;
  cars: CarState[];
  weather: 'dry' | 'wet';
}

export interface GameState {
  season: number;
  raceWeekend: number;
  playerTeamId: string;
  drivers: Driver[];
  teams: Team[];
  raceSession?: RaceSession;
  currentScreen: string; // e.g., 'team-selection', 'pre-season', 'race-weekend'
}

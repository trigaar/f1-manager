// Fix: Added constant exports to make the file a valid module.
export const LAPS_PER_RACE = 50;
export const MAX_DRIVERS = 20;

export const TYRE_COMPOUNDS = {
  SOFT: 'soft',
  MEDIUM: 'medium',
  HARD: 'hard',
  INTERMEDIATE: 'intermediate',
  WET: 'wet',
} as const;

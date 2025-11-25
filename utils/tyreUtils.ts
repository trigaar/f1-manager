// Fix: Implemented utility functions to make the file a valid module.
import { TyreCompound } from '../types';
import { TYRE_COMPOUNDS } from '../constants';

export function getTyreColor(compound: TyreCompound): string {
  switch (compound) {
    case TYRE_COMPOUNDS.SOFT:
      return '#ff4d4d';
    case TYRE_COMPOUNDS.MEDIUM:
      return '#ffd600';
    case TYRE_COMPOUNDS.HARD:
      return '#f0f0f0';
    case TYRE_COMPOUNDS.INTERMEDIATE:
      return '#4caf50';
    case TYRE_COMPOUNDS.WET:
      return '#2196f3';
    default:
      return 'grey';
  }
}

export function calculateTyreWear(distance: number, compound: TyreCompound): number {
  let wearRate = 1;
  if (compound === TYRE_COMPOUNDS.SOFT) wearRate = 1.5;
  if (compound === TYRE_COMPOUNDS.HARD) wearRate = 0.7;
  return distance * wearRate;
}

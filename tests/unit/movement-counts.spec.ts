import { describe, expect, it } from 'vitest';
import { countMovementAppearances, sessions } from '../../shared/frontend/data-access/src';

describe('countMovementAppearances', () => {
  it('counts how many class items use each movement', () => {
    const counts = countMovementAppearances(sessions);
    expect(counts['shoulder-taps']).toBe(2);
    expect(counts['single-leg-deadlift']).toBe(2);
    expect(counts['burpees']).toBe(1);
    expect(counts['single-arm-scarecrow-pull']).toBe(1);
  });
});

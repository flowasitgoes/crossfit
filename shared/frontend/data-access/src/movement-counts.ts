import type { Session } from '@app/contracts';

/** Counts how many class items point at each movement id. */
export function countMovementAppearances(sessions: Session[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const session of sessions) {
    for (const block of session.blocks) {
      for (const item of block.items) {
        if (!item.movementId) {
          continue;
        }
        counts[item.movementId] = (counts[item.movementId] ?? 0) + 1;
      }
    }
  }
  return counts;
}

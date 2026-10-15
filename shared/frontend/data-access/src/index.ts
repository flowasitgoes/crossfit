import { makeEnvironmentProviders } from '@angular/core';
import { MovementRepository } from './movement-repository';
import { SessionRepository } from './session-repository';

export { MovementRepository } from './movement-repository';
export { SessionRepository } from './session-repository';
export { countMovementAppearances } from './movement-counts';
export { movements, sessionOverviews, sessions } from './catalog';

export function provideDataAccess() {
  return makeEnvironmentProviders([MovementRepository, SessionRepository]);
}

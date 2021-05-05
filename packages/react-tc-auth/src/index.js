import { createJwtAuthService } from './modules/jwtAuthServiceFactory';

export function createAuthService(config) {
  switch (config.authType) {
    case 'ls':
      return createJwtAuthService(config);

    default:
      return null;
  }
}

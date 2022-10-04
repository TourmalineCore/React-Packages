import { createJwtAuthService } from './modules/jwtAuthServiceFactory';
import { Config } from './types/index';

interface ICreateAuthService extends Config {
  authType: 'ls' | 'cookies',
}

export function createAuthService(config: ICreateAuthService) {
  switch (config.authType) {
    case 'ls':
      return createJwtAuthService(config);

    default:
      return null;
  }
}

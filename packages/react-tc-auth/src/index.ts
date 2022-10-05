import { createJwtAuthService } from './modules/jwtAuthServiceFactory';
import { Config } from './types/index';

export function createAuthService(config: Config) {
  return createJwtAuthService(config);
}

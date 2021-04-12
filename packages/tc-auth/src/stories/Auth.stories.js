import { withKnobs } from '@storybook/addon-knobs';

import { createAuthService } from '../index';

export default {
  title: 'Auth Service',
  decorators: [withKnobs],
};

export const AuthService = () => {
  const authService = createAuthService({
    authApiRoot: '/auth',

    storageConfig: {
      storageType: 'ls',
      storageKey: 'AUTH_TOKEN',
      lsTokenKey: 'accessToken',
      lsTokenValueKey: 'value',
      lsTokenExpireKey: 'expiresInUtc',
      cookiesHttpOnly: true,
    },

    refreshStorageConfig: {
      storageType: 'ls',
      storageKey: 'REFRESH_AUTH_TOKEN',
      lsTokenKey: 'refreshToken',
      lsTokenValueKey: 'value',
      lsTokenExpireKey: 'expiresInUtc',
      cookiesHttpOnly: true,
    },
  });

  console.log(authService);

  return 'auth-here';
};

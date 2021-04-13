import { withKnobs } from '@storybook/addon-knobs';

import { handlers } from '../mocks/handlers';
import { worker } from '../../../../.storybook/browser';

import { createJwtAuthService } from '../index';

export default {
  title: 'Auth Service',
  decorators: [
    (Story) => {
      worker.use(...handlers);

      return <Story />;
    },
    withKnobs,
  ],
};

const authService = createJwtAuthService({
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

export const AuthService = () => {
  const [isAuthenticated] = authService.useAuth();

  return (
    <div>
      Auth calls mocking by service worker, you can open dev console and check output
      <br />
      <br />
      {
        isAuthenticated
          ? (
            <div>
              You are now logged in
              <br />
              <br />
              <button type="button" onClick={logoutUser}>logout</button>
            </div>
          )
          : (
            <div>
              Press the button to log in
              <br />
              <br />
              <button type="button" onClick={sendLoginData}>login</button>
            </div>
          )
      }
    </div>
  );

  function sendLoginData() {
    authService.loginCall({
      login: 'avava',
      password: '1231',
    })
      .then((response) => authService.login(response.data));
  }

  function logoutUser() {
    authService.logout();
  }
};

import { withKnobs } from '@storybook/addon-knobs';

import { handlers } from '../mocks/handlers';
import { worker } from '../../../../.msw/browser';

import { createAuthService } from '../index';

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

const authService = createAuthService({
  authApiRoot: '/auth',
  authType: 'ls',
  tokenAccessor: 'accessToken',
  refreshTokenAccessor: 'refreshToken',
  tokenValueAccessor: 'value',
  tokenExpireAccessor: 'expiresInUtc',
});

export const AuthService = () => {
  const [isAuthenticated] = authService.useAuth();

  return (
    <div>
      Auth calls mocked by service worker, you can open dev console and check output
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
              <button type="button" onClick={setExpiredAndGet}>
                set access token expired and try to get it
              </button>
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
      .then((response) => authService.setLoggedIn(response.data));
  }

  function logoutUser() {
    authService.setLoggedOut();
  }

  function setExpiredAndGet() {
    localStorage.setItem('accessToken', JSON.stringify({
      value: '12345',
      expiresInUtc: '2010-04-19T06:43:27.2953284Z',
    }));

    authService.getAuthToken();
  }
};

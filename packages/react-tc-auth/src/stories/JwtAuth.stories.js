/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useContext } from 'react';
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
  authApiRoot: 'https://testhost.com/auth',
  tokenAccessor: 'accessToken',
  refreshTokenAccessor: 'refreshToken',
  tokenValueAccessor: 'value',
  tokenExpireAccessor: 'expiresInUtc',
  customGetFingerprint: async () => '12345',
});

const AuthContent = () => {
  const [isAuthenticated] = useContext(authService.AuthContext);

  return (
    <div>
      Auth calls mocked by service worker, you can open dev console and check output
      <br />
      <br />
      <button type="button" onClick={getStorageToken}>
        get storage token
      </button>
      <br />
      <br />
      {
        isAuthenticated
          ? (
            <div>
              You are now logged in
              <br />
              <br />
              <button
                style={{
                  marginRight: 16,
                }}
                type="button"
                onClick={logoutUser}
              >
                logout
              </button>

              <button
                type="button"
                onClick={setExpiredAndGet}
              >
                set access token expired and try `getAuthTokenOrRefresh()`
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

    authService.getAuthTokenOrRefresh();
  }

  function getStorageToken() {
    const token = authService.getAuthToken();

    // eslint-disable-next-line no-alert
    alert(`token: ${token}`);
  }
};

export const AuthService = () => (
  <authService.AuthProvider>
    <AuthContent />
  </authService.AuthProvider>
);

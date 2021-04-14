import { useState, useEffect } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { handlers } from '../mocks/handlers';
import { worker } from '../../../../.msw/browser';

import { createCookiesAuthService } from '../index';

export default {
  title: 'Cookies Auth Service',
  decorators: [
    (Story) => {
      worker.use(...handlers);

      return <Story />;
    },
    withKnobs,
  ],
};

const authService = createCookiesAuthService({
  authApiRoot: '/cookiesauth',
});

export const CookiesAuthService = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onInit();
  }, []);

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

  function onInit() {
    authService.getSession()
      .then((response) => {
        authService.getCSRF();

        setIsAuthenticated(!!response.data.isAuthenticated);
      });
  }

  function sendLoginData() {
    authService.login({
      login: 'avava',
      password: '1231',
    })
      .then(() => {
        setIsAuthenticated(true);
      });
  }

  function logoutUser() {
    authService.logout()
      .then(() => {
        setIsAuthenticated(false);
        authService.getCSRF();
      });
  }
};

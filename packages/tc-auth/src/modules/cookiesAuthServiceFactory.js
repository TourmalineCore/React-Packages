import axios from 'axios';

import { getCookie } from './utils/cookiesHelpers';

export const createCookiesAuthService = ({
  authApiRoot = '/',
  credentials = 'same-origin',
  csrfTokenKey = 'csrf-token',
}) => {
  async function getSession() {
    return axios({
      url: `${authApiRoot}/session`,
      credentials,
    });
  }

  async function getCSRF() {
    return axios({
      url: `${authApiRoot}/csrf`,
      credentials,
    });
  }

  async function login(data) {
    const csrfToken = getCookie(csrfTokenKey);

    return axios({
      url: `${authApiRoot}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials,
      data,
    });
  }

  async function logout() {
    return axios({
      url: `${authApiRoot}/logout`,
      credentials,
    });
  }

  return {
    getSession,
    getCSRF,
    login,
    logout,
  };
};

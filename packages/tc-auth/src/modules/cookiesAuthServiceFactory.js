import axios from 'axios';

import { getCookie } from './utils/cookiesHelpers';

export const createCookiesAuthService = ({
  authApiRoot = '/',
  csrfTokenKey = 'csrf-token',
}) => {
  async function getSession() {
    return axios({
      url: `${authApiRoot}/session`,
      withCredentials: true,
    });
  }

  async function getCSRF() {
    return axios({
      url: `${authApiRoot}/csrf`,
      withCredentials: true,
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
      withCredentials: true,
      data,
    });
  }

  async function logout() {
    return axios({
      url: `${authApiRoot}/logout`,
      withCredentials: true,
    });
  }

  return {
    getSession,
    getCSRF,
    login,
    logout,
  };
};

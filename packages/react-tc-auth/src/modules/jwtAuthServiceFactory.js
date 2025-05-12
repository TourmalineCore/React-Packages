import axios from 'axios';
import { createJwtReactHelpers } from './reactHelpers/jwtReactHelpersFactory';

import LocalStorageService from './storage/LocalStorageService';
import TokenProvider from './token/TokenProvider';

export const createJwtAuthService = ({
  authApiRoot = '/',
  tokenAccessor = 'accessToken',
  refreshTokenAccessor = 'refreshToken',
  tokenValueAccessor = 'value',
  tokenExpireAccessor = 'expiresInUtc',
}) => {
  const tokenStorage = new LocalStorageService({
    tokenKey: tokenAccessor,
    tokenValueKey: tokenValueAccessor,
    tokenExpireKey: tokenExpireAccessor,
  });

  const refreshTokenStorage = new LocalStorageService({
    tokenKey: refreshTokenAccessor,
    tokenValueKey: tokenValueAccessor,
    tokenExpireKey: tokenExpireAccessor,
  });

  const tokenProvider = new TokenProvider({
    tokenStorage,
    refreshTokenStorage,
    config: {
      tokenAccessor,
      refreshTokenAccessor,
      tokenValueAccessor,
      tokenExpireAccessor,
    },
    refreshTokenCall,
  });

  async function refreshTokenCall(refreshTokenValue) {
    return axios({
      url: `${authApiRoot}/refresh`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        refreshTokenValue,
      },
    });
  }

  async function loginCall(data) {
    return axios({
      url: `${authApiRoot}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...data,
      },
    });
  }

  async function logoutCall() {
    const refreshTokenValue = refreshTokenStorage.getTokenValue();

    return axios({
      url: `${authApiRoot}/logout`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        refreshTokenValue,
      },
    });
  }

  async function refreshToken() {
    await tokenProvider.update();
  }

  function setLoggedIn(newTokenPair) {
    const newTokenObject = newTokenPair[tokenAccessor];
    const newRefreshTokenObject = newTokenPair[refreshTokenAccessor];

    tokenProvider.setTokenPair(newTokenObject, newRefreshTokenObject);
  }

  function setLoggedOut() {
    tokenProvider.setTokenPair(null, null);
  }

  async function getAuthTokenOrRefresh() {
    const token = await tokenProvider.getActualToken();

    return token;
  }

  function getAuthToken() {
    return tokenStorage.getTokenValue();
  }

  function getRefreshToken() {
    return refreshTokenStorage.getTokenValue();
  }

  function subscribeOnTokenChange(listener, options) {
    tokenProvider.subscribe(listener, options);
  }

  function unsubscribeOnTokenChange(listener) {
    tokenProvider.unsubscribe(listener);
  }

  return {
    getAuthToken,
    getRefreshToken,
    getAuthTokenOrRefresh,
    loginCall,
    logoutCall,
    refreshToken,
    setLoggedIn,
    setLoggedOut,
    subscribeOnTokenChange,
    unsubscribeOnTokenChange,
    ...createJwtReactHelpers({ tokenProvider }),
  };
};

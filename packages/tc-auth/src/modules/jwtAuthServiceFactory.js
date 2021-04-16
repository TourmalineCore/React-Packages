import axios from 'axios';
import { createJwtReactHelpers } from './reactHelpers/jwtReactHelpersFactory';

import LocalStorageService from './storage/LocalStorageService';
import TokenProvider from './token/TokenProvider';
import { getFingerprint } from './utils/getFingerprint';

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
    const fingerprint = await getFingerprint();

    return axios({
      url: `${authApiRoot}/refresh`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        token: refreshTokenValue,
        fingerprint,
      },
    });
  }

  async function loginCall(data) {
    const fingerprint = await getFingerprint();

    return axios({
      url: `${authApiRoot}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...data,
        fingerprint,
      },
    });
  }

  async function logoutCall() {
    return axios({
      url: `${authApiRoot}/logout`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    });
  }

  function refreshToken() {
    tokenProvider.update();
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

  return {
    getAuthToken,
    getAuthTokenOrRefresh,
    loginCall,
    logoutCall,
    refreshToken,
    setLoggedIn,
    setLoggedOut,
    ...createJwtReactHelpers({ tokenProvider }),
  };
};

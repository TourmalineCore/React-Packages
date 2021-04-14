import { useEffect, useState } from 'react';
import axios from 'axios';

import LocalStorageService from './storage/LocalStorageService';
import TokenProvider from './TokenProvider';

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
      data: JSON.stringify(refreshTokenValue),
    });
  }

  async function loginCall(data) {
    return axios({
      url: `${authApiRoot}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
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

  const setLoggedIn = (newTokenPair) => {
    const newTokenObject = newTokenPair[tokenAccessor];
    const newRefreshTokenObject = newTokenPair[refreshTokenAccessor];

    tokenProvider.setTokenPair(newTokenObject, newRefreshTokenObject);
  };

  const setLoggedOut = () => {
    tokenProvider.setTokenPair(null, null);
  };

  const getAuthToken = async () => {
    const token = await tokenProvider.getActualToken();

    return token;
  };

  const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsAuthenticated) => {
        setIsAuthenticated(newIsAuthenticated);
      };

      tokenProvider.subscribe(listener, { invokeOnSubscribe: true });

      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isAuthenticated];
  };

  return {
    useAuth,
    getAuthToken,
    loginCall,
    logoutCall,
    setLoggedIn,
    setLoggedOut,
  };
};

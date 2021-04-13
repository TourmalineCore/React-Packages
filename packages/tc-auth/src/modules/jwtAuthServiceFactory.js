import { useEffect, useState } from 'react';
import axios from 'axios';

import createStorage from './storage/storageFactory';
import TokenProvider from './TokenProvider';

export const createJwtAuthService = ({
  authApiRoot = '/',

  storageConfig = {
    storageType: 'ls',
    storageKey: 'AUTH_TOKEN',
    lsTokenKey: 'accessToken',
    lsTokenValueKey: 'value',
    lsTokenExpireKey: 'expiresInUtc',
    cookiesHttpOnly: true,
  },
  refreshStorageConfig = {
    storageType: 'ls',
    storageKey: 'REFRESH_AUTH_TOKEN',
    lsTokenKey: 'refreshToken',
    lsTokenValueKey: 'value',
    lsTokenExpireKey: 'expiresInUtc',
    cookiesHttpOnly: true,
  },
}) => {
  const tokenStorage = createStorage(storageConfig);
  const refreshTokenStorage = createStorage(refreshStorageConfig);

  const tokenProvider = new TokenProvider({
    tokenStorage,
    refreshTokenStorage,
    storageConfig,
    refreshStorageConfig,
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

  const login = (newTokenPair) => {
    const newTokenObject = newTokenPair[storageConfig.lsTokenKey];
    const newRefreshTokenObject = newTokenPair[refreshStorageConfig.lsTokenKey];

    tokenProvider.setTokenPair(newTokenObject, newRefreshTokenObject);
  };

  const logout = () => {
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
    login,
    logout,
  };
};

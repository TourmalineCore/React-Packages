import { useEffect, useState } from 'react';
import axios from 'axios';

import StorageService from './StorageService';
import TokenProvider from './TokenProvider';

export const AuthService = ({
  authApiRoot = '/',
  accessTokenExpireKey,
  accessTokenKey,
  storageKey = 'AUTH_KEY',
  onRefreshToken,
  storage = new StorageService(),
}) => {
  const tokenProvider = new TokenProvider({
    authApiRoot,
    accessTokenExpireKey,
    accessTokenKey,
    storageKey,
    onRefreshToken,
    storage,
  });

  const login = (newToken) => {
    tokenProvider.setToken(newToken);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const getAuthToken = async () => {
    const token = await tokenProvider.getActualToken();

    return token;
  };

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

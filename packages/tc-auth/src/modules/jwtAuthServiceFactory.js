import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import LocalStorageService from './storage/LocalStorageService';
import TokenProvider from './TokenProvider';
import { getFingerprint } from './utils/getFingerprint';

export const createJwtAuthService = ({
  authApiRoot = '/',
  tokenAccessor = 'accessToken',
  refreshTokenAccessor = 'refreshToken',
  tokenValueAccessor = 'value',
  tokenExpireAccessor = 'expiresInUtc',
}) => {
  const AuthContext = createContext();

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

  const refreshToken = () => {
    tokenProvider.update();
  };

  const setLoggedIn = (newTokenPair) => {
    const newTokenObject = newTokenPair[tokenAccessor];
    const newRefreshTokenObject = newTokenPair[refreshTokenAccessor];

    tokenProvider.setTokenPair(newTokenObject, newRefreshTokenObject);
  };

  const setLoggedOut = () => {
    tokenProvider.setTokenPair(null, null);
  };

  const getAuthTokenOrRefresh = async () => {
    const token = await tokenProvider.getActualToken();

    return token;
  };

  const getAuthToken = () => tokenStorage.getTokenValue();

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

  function AuthProvider({ children }) {
    const [isAuthenticated] = useAuth();

    return (
      <AuthContext.Provider
        value={[isAuthenticated]}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  function withPrivateRoute(ComposedComponent) {
    return function RequireAuthentication(props) {
      const isAuthenticated = useContext(AuthContext);
      const history = useHistory();

      useEffect(() => {
        if (!isAuthenticated) {
          history.push(getAuthPathWithFromProperty(history.location.pathname));
        }
      }, [isAuthenticated]);

      return isAuthenticated ? <ComposedComponent {...props} /> : null;
    };

    function getAuthPathWithFromProperty(from) {
      return `/auth${from !== '/' && from ? `?from=${from}` : ''}`;
    }
  }

  return {
    AuthContext,
    AuthProvider,
    withPrivateRoute,
    useAuth,
    getAuthToken,
    getAuthTokenOrRefresh,
    loginCall,
    logoutCall,
    refreshToken,
    setLoggedIn,
    setLoggedOut,
  };
};

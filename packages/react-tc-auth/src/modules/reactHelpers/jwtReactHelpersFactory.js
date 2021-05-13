import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useHistory } from 'react-router-dom';

export function createJwtReactHelpers({
  tokenProvider,
}) {
  const AuthContext = createContext();

  function useAuth() {
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
  }

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
      const [isAuthenticated] = useContext(AuthContext);
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
    useAuth,
    withPrivateRoute,
  };
}

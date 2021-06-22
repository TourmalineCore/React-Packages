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
    const [contextTokenValue, setContextTokenValue] = useState(tokenProvider.getTokenValue());

    useEffect(() => {
      const listener = (newToken) => {
        setContextTokenValue(newToken);
      };

      tokenProvider.subscribe(listener, { invokeOnSubscribe: true });

      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [contextTokenValue];
  }

  function AuthProvider({ children }) {
    const [tokenValue] = useAuth();

    return (
      <AuthContext.Provider
        value={[tokenValue]}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  function withPrivateRoute(ComposedComponent) {
    return function RequireAuthentication(props) {
      const [tokenValue] = useContext(AuthContext);
      const history = useHistory();

      useEffect(() => {
        if (!tokenValue) {
          history.push(getAuthPathWithFromProperty(history.location.pathname));
        }
      }, [tokenValue]);

      return tokenValue ? <ComposedComponent {...props} /> : null;
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

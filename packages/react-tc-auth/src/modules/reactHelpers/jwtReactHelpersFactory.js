import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

  function withPrivateRoute(ComposedComponent, isExternalRedirect = false) {
    return function RequireAuthentication(props) {
      const [tokenValue] = useContext(AuthContext);
      const navigation = useNavigate();
      const location = useLocation();

      useEffect(() => {
        if (!tokenValue) {
          if (isExternalRedirect) {
            window.location.href = getAuthPathWithFromProperty(location.pathname);

            return;
          }

          navigation(getAuthPathWithFromProperty(location.pathname));
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

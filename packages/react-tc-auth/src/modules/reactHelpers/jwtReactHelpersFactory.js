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

  export function RequireAccessToken({
    children,
  }) {
    const [
      token,
    ] = useContext(AuthContext)

    useEffect(() => {
      if (!token) {
        window.location.href = `/auth?returnUrl=${encodeURIComponent(window.location.href)}`
      }
    }, [
      token,
    ])

    if (!token) {
      return null
    }

    return (
      <>
        {children}
      </>
    )
  }

  function withPrivateRoute(ComposedComponent) {
    return function RequireAuthentication(props) {
      const [tokenValue] = useContext(AuthContext);
      const navigation = useNavigate();
      const location = useLocation();

      useEffect(() => {
        if (!tokenValue) {
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
    RequireAccessToken,
    useAuth,
    withPrivateRoute,
  };
}

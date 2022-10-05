import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import TokenProvider from '../token/TokenProvider';

export function createJwtReactHelpers({
  tokenProvider, 
}: {
  tokenProvider: TokenProvider,
}) {
  const AuthContext = createContext<(string | null)[]>([]);

  function useAuth() {
    const [contextTokenValue, setContextTokenValue] = useState<string | null>(tokenProvider.getTokenValue());

    useEffect(() => { 
      const listener = (newToken: string | null) => {
        setContextTokenValue(newToken);
      };

      tokenProvider.subscribe(listener, { invokeOnSubscribe: true });

      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [contextTokenValue];
  }

  function AuthProvider({ 
    children 
  }: {
    children: ReactNode;
  }) {
    const tokenValue = useAuth();

    return (
      <AuthContext.Provider 
        value={tokenValue}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  const withPrivateRoute = <Type extends Record<string, unknown>>(ComposedComponent: FunctionComponent<Type>) => {
    return function RequireAuthentication(props: Type) {
      const tokenValue = useContext(AuthContext);

      const navigation = useNavigate();
      const location = useLocation();

      useEffect(() => {
        if (!tokenValue) {
          navigation(getAuthPathWithFromProperty(location.pathname));
        }
      }, [tokenValue]);

      return tokenValue ? <ComposedComponent {...props} /> : null;
    };

    function getAuthPathWithFromProperty(from: string) {
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

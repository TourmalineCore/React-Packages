# Tourmaline Core jwt authentication package

## authService factory

usage
```JS
import { createAuthService } from '@tourmalinecore/tc-auth';

const authService = createAuthService({
  authApiRoot: '/', // api root for auth, eg: yourdomain/api/auth
  authType: 'ls' | 'cookies', // implementation type, not just storage usage

  // for ls we fetch as pair of jwt + rt tokens, there are accessors for dto fields
  tokenAccessor: 'accessToken',
  refreshTokenAccessor: 'refreshToken',
  tokenValueAccessor: 'value',
  tokenExpireAccessor: 'expiresInUtc',
})
```

authService now provides:
```JS
{
  getAuthToken, // async function, gets token from storage, refreshes if expired
  loginCall, // fetch login data with axios
  logoutCall,
  setLoggedIn, // set token to storage
  setLoggedOut, // remove token from storage
  AuthContext, // react auth context
  AuthProvider, // react context provider
  withPrivateRoute, // react HOC for private routes
  useAuth, // hook for custom react auth context provider
}
```
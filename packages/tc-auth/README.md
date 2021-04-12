# Tourmaline Core jwt authentication package

## authService factory

usage
```JS
import { createAuthService } from '@tourmalinecore/tc-auth';

const authService = createAuthService({
  authApiRoot: '/', // api root for auth, eg: yourdomain/api/auth

  // storage for jwt token
  // for ls we fetch as pair of jwt + rt tokens
  storageConfig: {
    storageType: 'ls', // ls | cookies
    storageKey: 'AUTH_TOKEN', // key for stored data
    lsTokenKey: 'accessToken', // accessor key in fetched pair
    // local storage token fetched and stored as object with 2 fields, so you can configure keys naming
    lsTokenValueKey: 'value',
    lsTokenExpireKey: 'expiresInUtc',
    cookiesHttpOnly: true, // with this option cookies cannot be handled by js
  },

  // storage for refresh token, same config options as for jwt storage
  refreshStorageConfig: {
    storageType: 'ls',
    storageKey: 'REFRESH_AUTH_TOKEN',
    lsTokenKey: 'refreshToken',
    lsTokenValueKey: 'value',
    lsTokenExpireKey: 'expiresInUtc',
    cookiesHttpOnly: true,
  },
})
```

authService now provides:
```JS
{
  useAuth, // hook for react auth context provider
  getAuthToken, // async function, gets token from storage, refreshes if expired
  loginCall, // fetch login data with axios
  login, // set token to storage
  logout, // remove token from storage
}
```
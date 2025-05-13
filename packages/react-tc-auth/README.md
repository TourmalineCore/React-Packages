# Tourmaline Core jwt authentication package

A simple provider, that will allow you easily implement athentication flow in your app.

# Instalation 

The package can be installed via npm:
```
npm install @tourmalinecore/react-tc-auth --save
```

Or via yarn:
```
yarn add @tourmalinecore/react-tc-auth
```

# Configuration

```JS
import { createAuthService } from '@tourmalinecore/react-tc-auth';

const authService = createAuthService({
  authApiRoot: 'https://example.com/auth',
  authType: 'ls',
  tokenAccessor: 'accessToken',
  refreshTokenAccessor: 'refreshToken',
  tokenValueAccessor: 'value',
  tokenExpireAccessor: 'expiresInUtc',
})
```

## createAuthService params 

| Name | Description |
|-|-|
| authApiRoot | API root for authentication, e.g.: `yourdomain/api/auth` |
| authType | Implementation type of the authentication, not just storage usage. **Accepts 'ls' or 'cookies'** |
| tokenAccessor | Name of the property of the response object representing **access** token |
| refreshTokenAccessor | Name of the property of the response object representing **refresh** token |
| tokenValueAccessor | Name of the property of the token objects representing the token **value** |
| tokenExpireAccessor | Name of the property of the token objects representing the **expiration time** of the token in UTC |

# Usage

createAuthService creates an authService object, which provides next functionality:

| Name | Description |
|-|-|
| getAuthToken | Get the token value from the storage |
| getAuthTokenOrRefresh | Async function, gets the token from the storage, refreshes if expired |
| refreshToken | Async function, calls the API to refresh the token |
| loginCall | Fetch the login data with axios |
| logoutCall | Fetch the logout data with axios |
| setLoggedIn | Sets the token to the storage |
| setLoggedOut | Removes the token from the storage |
| subscribeOnTokenChange | Adds listener for token change |
| unsubscribeOnTokenChange | Removes listener for token change |
| AuthContext | React auth context |
| AuthProvider | React context provider |
| withPrivateRoute | React HOC for the private routes |
| useAuth | Hook for the custom react auth context provider |

## Login
```JS
function login() {
    authService
      .loginCall({
        login: 'login',
        password: 'password',
      })
      .then((response) => authService.setLoggedIn(response.data));
  }
```

You can use it as is just by adding `await getAuthTokenOrRefresh()` to your API calls to get actual access token.

## Use Token
```JS
function getData() {
    const token = await authProvider.getAuthTokenOrRefresh();

    return axios({
      url: 'https://example.com/data',
      method: 'GET',
      headers: {
        'Authentication': `Bearer ${token}`,
      },
    });
  }
```

 Or you can add an error interceptor for Axios and call `await refreshToken()` inside it. Do not forget to change the logged state after it (`setLoggedOut, setLoggedIn`), these calls will notify the storage observers: 

 ```JS
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://example.com',
});

api.interceptors.request.use((config) => {
  const token = authService.getAuthToken();

  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
}, () => {});

api.interceptors.response.use(() => {}, async (error) => {
  if (
    (error.response && error.response.status === 401)
    || (error.response && error.response.status === 403)
  ) {
    await authService.refreshToken();

    return api.request(error.config);
  }

  return Promise.reject(error);
});
 ```

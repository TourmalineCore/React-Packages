import TokenProvider from './TokenProvider';
import LocalStorageService from '../storage/LocalStorageService';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_VALUE_ACCESSOR = 'value';
const TOKEN_EXPIRES_ACCESSOR = 'expiresInUtc';

const testTokenPair = {
  [TOKEN_KEY]: {
    [TOKEN_VALUE_ACCESSOR]: '12345',
    [TOKEN_EXPIRES_ACCESSOR]: '2022-04-19T06:43:27.2953284Z',
  },
  [REFRESH_TOKEN_KEY]: {
    [TOKEN_VALUE_ACCESSOR]: 'refresh12345',
    [TOKEN_EXPIRES_ACCESSOR]: '2022-04-19T06:43:27.2953284Z',
  },
};

describe('token provider behavior', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  });

  const tokenStorage = new LocalStorageService({
    tokenKey: TOKEN_KEY,
    tokenValueKey: TOKEN_VALUE_ACCESSOR,
    tokenExpireKey: TOKEN_EXPIRES_ACCESSOR,
  });

  const refreshTokenStorage = new LocalStorageService({
    tokenKey: REFRESH_TOKEN_KEY,
    tokenValueKey: TOKEN_VALUE_ACCESSOR,
    tokenExpireKey: TOKEN_EXPIRES_ACCESSOR,
  });

  const tokenProvider = new TokenProvider({
    tokenStorage,
    refreshTokenStorage,
    config: {
      tokenAccessor: TOKEN_KEY,
      refreshTokenAccessor: REFRESH_TOKEN_KEY,
      tokenValueAccessor: TOKEN_VALUE_ACCESSOR,
      tokenExpireAccessor: TOKEN_EXPIRES_ACCESSOR,
    },
    refreshTokenCall: () => Promise.resolve({ data: testTokenPair }),
  });

  it('should properly notify subscribers', () => {
    expect.hasAssertions();

    const testCallback = (value) => {
      expect(value).toBeDefined();
    };

    tokenProvider.subscribe(testCallback);
    tokenProvider.notify();
  });

  it('should properly update token on getter call', async () => {
    expect.hasAssertions();

    const testToken = {
      [TOKEN_VALUE_ACCESSOR]: '12345',
      [TOKEN_EXPIRES_ACCESSOR]: '2018-04-19T06:43:27.2953284Z',
    };

    localStorage.setItem(TOKEN_KEY, JSON.stringify(testToken));
    localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(testToken));

    const actualToken = await tokenProvider.getActualToken();

    expect(actualToken).toStrictEqual(testTokenPair[TOKEN_KEY][TOKEN_VALUE_ACCESSOR]);
  });
});

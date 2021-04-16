import TokenProvider from './TokenProvider';
import LocalStorageService from '../storage/LocalStorageService';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_VALUE_ACCESSOR = 'value';
const TOKEN_EXPIRES_ACCESSOR = 'expiresInUtc';

const today = new Date();
const NEXT_YEAR_EXPIRATION_DATE = new Date(today.getFullYear() + 1).toISOString();
const LAST_YEAR_EXPIRATION_DATE = new Date(today.getFullYear() - 1).toISOString();

const testTokenPair = {
  [TOKEN_KEY]: {
    [TOKEN_VALUE_ACCESSOR]: '12345',
    [TOKEN_EXPIRES_ACCESSOR]: NEXT_YEAR_EXPIRATION_DATE,
  },
  [REFRESH_TOKEN_KEY]: {
    [TOKEN_VALUE_ACCESSOR]: 'refresh12345',
    [TOKEN_EXPIRES_ACCESSOR]: NEXT_YEAR_EXPIRATION_DATE,
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
      [TOKEN_EXPIRES_ACCESSOR]: LAST_YEAR_EXPIRATION_DATE,
    };

    localStorage.setItem(TOKEN_KEY, JSON.stringify(testToken));
    localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(testToken));

    const actualToken = await tokenProvider.getActualToken();

    expect(actualToken).toStrictEqual(testTokenPair[TOKEN_KEY][TOKEN_VALUE_ACCESSOR]);
  });
});

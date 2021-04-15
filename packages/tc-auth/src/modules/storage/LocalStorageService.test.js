import LocalStorageService from './LocalStorageService';

const STORAGE_TOKEN_KEY = 'token';
const STORAGE_TOKEN_VALUE_ACCESSOR = 'value';
const STORAGE_TOKEN_EXPIRES_ACCESSOR = 'expiresInUtc';

const testToken = {
  [STORAGE_TOKEN_VALUE_ACCESSOR]: '12345',
  [STORAGE_TOKEN_EXPIRES_ACCESSOR]: '2022-04-19T06:43:27.2953284Z',
};

describe('local storage token model', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  });

  const storage = new LocalStorageService({
    tokenKey: STORAGE_TOKEN_KEY,
    tokenValueKey: STORAGE_TOKEN_VALUE_ACCESSOR,
    tokenExpireKey: STORAGE_TOKEN_EXPIRES_ACCESSOR,
  });

  it('should correctly set token', () => {
    expect.hasAssertions();

    storage.setToken(testToken);

    const token = JSON.parse(localStorage.getItem(STORAGE_TOKEN_KEY));

    expect(token).toStrictEqual(testToken);
  });

  it('should correctly get token', () => {
    expect.hasAssertions();

    localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(testToken));

    const token = storage.getTokenObject();

    expect(token).toStrictEqual(testToken);
  });

  it('should correctly get token value', () => {
    expect.hasAssertions();

    localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(testToken));

    const token = storage.getTokenValue();

    expect(token).toStrictEqual(testToken[STORAGE_TOKEN_VALUE_ACCESSOR]);
  });

  it('should correctly get token expires', () => {
    expect.hasAssertions();

    localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(testToken));

    const token = storage.getTokenExpires();

    expect(token).toStrictEqual(testToken[STORAGE_TOKEN_EXPIRES_ACCESSOR]);
  });

  it('should correctly check if token expired', () => {
    expect.hasAssertions();

    localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify({
      [STORAGE_TOKEN_VALUE_ACCESSOR]: '12345',
      [STORAGE_TOKEN_EXPIRES_ACCESSOR]: '2018-04-19T06:43:27.2953284Z',
    }));

    const isExpired = storage.isExpired();

    expect(isExpired).toBeTruthy();
  });
});

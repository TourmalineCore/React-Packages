import LocalStorageService from './LocalStorageService';

const STORAGE_TOKEN_KEY = 'token';
const STORAGE_TOKEN_VALUE_ACCESSOR = 'value';
const STORAGE_TOKEN_EXPIRES_ACCESSOR = 'expiresInUtc';

const today = new Date();
const NEXT_YEAR_EXPIRATION_DATE = new Date(today.getFullYear() + 1).toISOString();
const LAST_YEAR_EXPIRATION_DATE = new Date(today.getFullYear() - 1).toISOString();

const testToken = {
  [STORAGE_TOKEN_VALUE_ACCESSOR]: '12345',
  [STORAGE_TOKEN_EXPIRES_ACCESSOR]: NEXT_YEAR_EXPIRATION_DATE,
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

  it('should correctly handle null token to set', () => {
    expect.hasAssertions();

    storage.setToken(null);

    const token = JSON.parse(localStorage.getItem(STORAGE_TOKEN_KEY));

    expect(token).toBeNull();
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
      [STORAGE_TOKEN_EXPIRES_ACCESSOR]: LAST_YEAR_EXPIRATION_DATE,
    }));

    const isExpired = storage.isExpired();

    expect(isExpired).toBeTruthy();
  });

  it('should correctly check if token dont exist', () => {
    expect.hasAssertions();

    const isExpired = storage.isExpired();

    expect(isExpired).toBeNull();
  });
});

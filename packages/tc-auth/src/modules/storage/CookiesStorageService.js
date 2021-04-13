import { getCookie } from '../utils/cookiesHelpers';

export default class CookiesStorageService {
  constructor(config = {}) {
    this.key = config.storageKey;
    this.tokenValueKey = config.lsTokenValueKey;
    this.tokenExpireKey = config.lsTokenExpireKey;

    this.httpOnly = config.cookiesHttpOnly;
  }

  setToken(token) {
    if (this.httpOnly) {
      return;
    }

    const tokenValue = token[this.tokenValueKey];
    const tokenExpires = token[this.tokenExpiresKey];

    document.cookie = `${this.key}=${tokenValue}; expires=${tokenExpires}`;
  }

  removeToken() {
    if (this.httpOnly) {
      return;
    }

    document.cookie = `${this.key}=""; max-age=-1`;
  }

  getTokenValue() {
    if (this.httpOnly) {
      return 'httpOnly';
    }

    return getCookie(this.key);
  }

  isExpired() {
    if (this.httpOnly) {
      return false;
    }

    return !!this.getTokenValue();
  }
}

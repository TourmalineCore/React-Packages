export default class CookiesStorageService {
  constructor(config = {}) {
    this.key = config.storageKey;
    this.httpOnly = config.cookiesHttpOnly;
  }

  setToken(tokenValue, tokenExpires) {
    if (this.httpOnly) {
      return;
    }

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

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default class LocalStorageService {
  tokenKey = '';
  tokenValueKey = '';
  tokenExpireKey = '';

  constructor({
    tokenKey,
    tokenValueKey,
    tokenExpireKey,
  }: {
    tokenKey: string;
    tokenValueKey: string;
    tokenExpireKey: string;
    }) {
    this.tokenKey = tokenKey;
    this.tokenValueKey = tokenValueKey;
    this.tokenExpireKey = tokenExpireKey;
  }

  getTokenObject = () => {
    const data = localStorage.getItem(this.tokenKey);
    const token = (data && JSON.parse(data)) || null;

    return token;
  }

  getTokenExpires = () => {
    const token = this.getTokenObject();
    return token ? token[this.tokenExpireKey] : null;
  }

  setToken = (tokenObject: Record<string, unknown> | null) => {
    if (!tokenObject) {
      return;
    }

    localStorage.setItem(this.tokenKey, JSON.stringify({
      [this.tokenValueKey]: tokenObject[this.tokenValueKey],
      [this.tokenExpireKey]: tokenObject[this.tokenExpireKey],
    }));
  }

  removeToken = () => localStorage.removeItem(this.tokenKey)

  getTokenValue = () => {
    const token = this.getTokenObject();

    return token ? token[this.tokenValueKey] : null;
  }

  isExpired = () => {
    const tokenObject = this.getTokenObject();

    if (!tokenObject) {
      return null;
    }

    const exp = tokenObject[this.tokenExpireKey];

    if (!exp) {
      return false;
    }

    return Date.now() > new Date(exp).valueOf();
  }
}

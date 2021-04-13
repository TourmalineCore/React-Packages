export default class LocalStorageService {
  constructor(config = {}) {
    this.key = config.storageKey;
    this.tokenValueKey = config.lsTokenValueKey;
    this.tokenExpireKey = config.lsTokenExpireKey;
  }

  getTokenObject = () => {
    const data = localStorage.getItem(this.key);
    const token = (data && JSON.parse(data)) || null;

    return token;
  }

  getTokenExpires = () => {
    const token = this.getTokenObject();

    return token ? token[this.tokenExpireKey] : null;
  }

  setToken = (tokenObject) => localStorage.setItem(this.key, JSON.stringify({
    [this.tokenValueKey]: tokenObject[this.tokenValueKey],
    [this.tokenExpireKey]: tokenObject[this.tokenExpireKey],
  }))

  removeToken = () => localStorage.removeItem(this.key)

  getTokenValue = () => {
    const token = this.getTokenObject();

    return token ? token[this.tokenValueKey] : null;
  }

  isExpired = () => {
    const tokenObject = this.getTokenObject();

    if (!tokenObject) {
      return null;
    }

    const exp = tokenObject[this.accessTokenExpireKey];

    if (!exp) {
      return false;
    }

    return Date.now() > new Date(exp).valueOf();
  }
}

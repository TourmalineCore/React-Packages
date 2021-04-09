export default class TokenProvider {
  constructor({
    storageKey,
    accessTokenKey,
    accessTokenExpireKey,
    onRefreshToken,
    storage,
  }) {
    this.listeners = [];
    this.storage = storage;

    this.storageKey = storageKey;
    this.accessTokenKey = accessTokenKey;
    this.accessTokenExpireKey = accessTokenExpireKey;

    this.onRefreshToken = onRefreshToken;
  }

  subscribe(listener, { invokeOnSubscribe = false } = {}) {
    this.listeners.push(listener);

    if (invokeOnSubscribe) {
      listener(this.isLoggedIn());
    }
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify() {
    const isLogged = this.isLoggedIn();

    this.listeners.forEach((listener) => listener(isLogged));
  }

  getStorageToken() {
    const data = this.storage.getItem(this.storageKey);
    const token = (data && JSON.parse(data)) || null;

    return token;
  }

  isExpired(token) {
    if (!token) {
      return null;
    }

    const exp = token[this.accessTokenExpireKey];

    if (!exp) {
      return false;
    }

    return Date.now() > new Date(exp).valueOf();
  }

  async checkExpiry() {
    const token = this.getStorageToken();

    if (token && this.isExpired(token)) {
      const newToken = this.onRefreshToken ? await this.onRefreshToken(token) : null;

      if (newToken) {
        this.setToken(newToken);
      } else {
        this.setToken(null);
      }
    }
  }

  async getActualToken() {
    await this.checkExpiry();

    const token = this.getStorageToken();

    return token && token[this.accessTokenKey];
  }

  setToken(token) {
    if (token) {
      this.storage.setItem(this.storageKey, JSON.stringify(token));
    } else {
      this.storage.removeItem(this.storageKey);
    }

    this.notify();
  }

  isLoggedIn() {
    return !!this.getStorageToken();
  }
}

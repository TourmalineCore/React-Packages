export default class TokenProvider {
  constructor({
    tokenStorage,
    refreshTokenStorage,
    storageConfig,
    refreshStorageConfig,
    refreshTokenCall,
  }) {
    this.listeners = [];
    this.tokenStorage = tokenStorage;
    this.refreshTokenStorage = refreshTokenStorage;

    this.storageConfig = storageConfig;
    this.refreshStorageConfig = refreshStorageConfig;

    this.refreshTokenCall = refreshTokenCall;
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

  async checkExpiryAndUpdate() {
    if (this.tokenStorage.isExpired()) {
      const newTokenPair = this.onRefreshToken
        ? await this.refreshTokenCall(this.refreshTokenStorage.getTokenValue())
        : null;

      if (newTokenPair) {
        const newTokenObject = newTokenPair[this.storageConfig.lsTokenKey];
        const newRefreshTokenObject = newTokenPair[this.refreshStorageConfig.lsTokenKey];

        this.setTokenPair(newTokenObject, newRefreshTokenObject);
      } else {
        this.setTokenPair(null, null);
      }
    }
  }

  async getActualToken() {
    await this.checkExpiryAndUpdate();

    const token = this.storage.getTokenValue();

    return token;
  }

  setToken(token) {
    if (token) {
      this.storage.setToken(token);
    } else {
      this.storage.removeToken();
    }

    this.notify();
  }

  setRefreshToken(refreshToken) {
    if (refreshToken) {
      this.refreshStorage.setToken(refreshToken);
    } else {
      this.refreshStorage.removeToken();
    }
  }

  setTokenPair(token, refreshToken) {
    this.setToken(token);
    this.setRefreshToken(refreshToken);
  }

  isLoggedIn() {
    return !!this.tokenStorage.getTokenValue();
  }
}

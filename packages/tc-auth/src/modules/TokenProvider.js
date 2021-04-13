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

  subscribe = (listener, { invokeOnSubscribe = false } = {}) => {
    this.listeners.push(listener);

    if (invokeOnSubscribe) {
      listener(this.isLoggedIn());
    }
  }

  unsubscribe = (listener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify = () => {
    const isLogged = this.isLoggedIn();

    this.listeners.forEach((listener) => listener(isLogged));
  }

  checkExpiryAndUpdate = async () => {
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

  getActualToken = async () => {
    await this.checkExpiryAndUpdate();

    const token = this.tokenStorage.getTokenValue();

    return token;
  }

  setToken = (token) => {
    if (token) {
      this.tokenStorage.setToken(token);
    } else {
      this.tokenStorage.removeToken();
    }

    this.notify();
  }

  setRefreshToken = (refreshToken) => {
    if (refreshToken) {
      this.refreshTokenStorage.setToken(refreshToken);
    } else {
      this.refreshTokenStorage.removeToken();
    }
  }

  setTokenPair = (token, refreshToken) => {
    this.setToken(token);
    this.setRefreshToken(refreshToken);
  }

  isLoggedIn = () => !!this.tokenStorage.getTokenValue()
}

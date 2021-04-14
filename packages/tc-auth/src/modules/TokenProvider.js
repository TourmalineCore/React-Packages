export default class TokenProvider {
  constructor({
    tokenStorage,
    refreshTokenStorage,
    config,
    refreshTokenCall,
  }) {
    this.listeners = [];
    this.tokenStorage = tokenStorage;
    this.refreshTokenStorage = refreshTokenStorage;

    this.config = config;

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
      const { data: newTokenPair } = this.refreshTokenCall
        ? await this.refreshTokenCall(this.refreshTokenStorage.getTokenValue())
        : null;

      if (newTokenPair) {
        const newTokenObject = newTokenPair[this.config.tokenAccessor];
        const newRefreshTokenObject = newTokenPair[this.config.refreshTokenAccessor];

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

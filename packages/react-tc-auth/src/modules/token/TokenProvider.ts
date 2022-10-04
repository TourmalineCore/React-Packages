import { AxiosResponse } from "axios";
import LocalStorageService from "../storage/LocalStorageService";

export default class TokenProvider {
  listeners: ((data: string | null) => unknown)[] = [];

  tokenStorage;

  config = {
    tokenAccessor: '',
    refreshTokenAccessor: '',
    tokenValueAccessor: '',
    tokenExpireAccessor: '',
  };

  refreshTokenStorage;

  refreshTokenCall;

  constructor({
    tokenStorage,
    refreshTokenStorage,
    config,
    refreshTokenCall,
  }: {
    tokenStorage: LocalStorageService,
    refreshTokenStorage: LocalStorageService,
    config: {
      tokenAccessor: string,
      refreshTokenAccessor: string,
      tokenValueAccessor: string,
      tokenExpireAccessor: string,
    },
    refreshTokenCall: (data: string) => Promise<AxiosResponse<{
      [key in string]: { tokenValueKey: string, tokenExpireKey: string | Date } | null
    }>>,
  }) {
    this.listeners = [];
    this.tokenStorage = tokenStorage;
    this.refreshTokenStorage = refreshTokenStorage;
    this.config = config;
    this.refreshTokenCall = refreshTokenCall;
  }

  subscribe = (
      listener: (data: string | null) => unknown, 
      { invokeOnSubscribe = false } = {}
    ) => {
    this.listeners.push(listener);

    if (invokeOnSubscribe) {
      listener(this.getTokenValue());
    }
  }

  unsubscribe = (listener: (data: string | null) => unknown) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify = () => {
    this.listeners.forEach((listener) => listener(this.getTokenValue()));
  }

  update = async () => {
    const response = this.refreshTokenCall
      ? await this.refreshTokenCall(this.refreshTokenStorage.getTokenValue())
      : null;

    const newTokenPair = response?.data;

    if (newTokenPair) {
      const newTokenObject = newTokenPair[this.config.tokenAccessor];
      const newRefreshTokenObject = newTokenPair[this.config.refreshTokenAccessor];

      this.setTokenPair(newTokenObject, newRefreshTokenObject);
    } else {
      this.setTokenPair(null, null);
    }
  }

  checkExpiryAndUpdate = async () => {
    if (this.tokenStorage.isExpired()) {
      await this.update();
    }
  }

  getActualToken = async () => {
    await this.checkExpiryAndUpdate();

    const token = this.tokenStorage.getTokenValue();

    return token;
  }

  setToken = (token: { 
      tokenValueKey: string | null, 
      tokenExpireKey: string | Date | null 
    } | null) => {
    if (token) {
      this.tokenStorage.setToken(token);
    } else {
      this.tokenStorage.removeToken();
    }

    this.notify();
  }

  setRefreshToken = (
      refreshToken: { 
        tokenValueKey: string, 
        tokenExpireKey: string | Date 
      } | null
    ) => {
    if (refreshToken) {
      this.refreshTokenStorage.setToken(refreshToken);
    } else {
      this.refreshTokenStorage.removeToken();
    }
  }

  setTokenPair = (
      token: { tokenValueKey: string, tokenExpireKey: string | Date } | null, 
      refreshToken: { tokenValueKey: string, tokenExpireKey: string | Date } | null
    ) => {
    this.setToken(token);
    this.setRefreshToken(refreshToken);
  }

  getTokenValue = () => this.tokenStorage.getTokenValue()

  isLoggedIn = () => !!this.tokenStorage.getTokenValue()
}

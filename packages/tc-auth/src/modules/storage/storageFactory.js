import LocalStorageService from './LocalStorageService';
import CookiesStorageService from './CookiesStorageService';

export default function createStorage(config) {
  switch (config.type) {
    case 'cookies':
      return new CookiesStorageService(config);

    default:
      return new LocalStorageService(config);
  }
}

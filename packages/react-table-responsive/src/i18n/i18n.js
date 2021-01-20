import en from './en';
import ru from './ru';

export function i18n(config = 'en') {
  if (typeof config === 'string') {
    return config === 'en' ? en : ru;
  }

  return config;
}

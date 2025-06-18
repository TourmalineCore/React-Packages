import { engStrings } from './en'
import { ruStrings } from './ru'

export function i18n(config = 'en') {
  if (typeof config === 'string') {
    return config === 'ru' ? ruStrings : engStrings
  }

  return config
}

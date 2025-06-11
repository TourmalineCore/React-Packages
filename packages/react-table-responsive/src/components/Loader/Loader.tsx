import { I18StringsProps } from '../../i18n/types'

export function Loader({
  loading,
  languageStrings,
}: {
  loading?: boolean,
  languageStrings: I18StringsProps,
}) {
  const {
    loadingLabel,
  } = languageStrings

  return (
    loading && (
    <div
      className="loader"
      data-cy="loader"
    >
      {loadingLabel}
    </div>
    )
  )
}

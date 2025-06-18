import { I18StringsProps } from '../../i18n/types'
import { IconNoRecord } from '../Icons/IconNoRecord'

export function NoRecords({
  isShow,
  languageStrings,
}: {
  isShow: boolean,
  languageStrings: I18StringsProps,
}) {
  const {
    noRecordsLabel,
  } = languageStrings

  return (
    <>
      {isShow
        && (
        <div
          className="tc-table-no-records"
        >
          <IconNoRecord />
          <div className="tc-table-no-records__text">
            {noRecordsLabel}
          </div>
        </div>
        )}
    </>
  )
}

import NoRecordsIcon from '../../assets/images/no-records.svg'
import { I18StringsProps } from '../../i18n/types'

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
          <img
            src={NoRecordsIcon}
            alt="No records"
          />
          <div className="tc-table-no-records__text">
            {noRecordsLabel}
          </div>
        </div>
        )}
    </>
  )
}

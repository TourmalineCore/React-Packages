import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { getRelativePosition } from '../../../../utils/getRelativePosition';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

import './ActionsDropdown.css';

export default function ActionsDropdown({
  tableContainerRef,
  actions,
  rowWithValues,
}) {
  const dropdownContainer = useRef();
  const dropdownList = useRef();
  const [isOpened, setIsOpened] = useState(false);

  useOnClickOutside([dropdownContainer, dropdownList], () => setIsOpened(false));

  const listPosition = getRelativePosition(dropdownContainer.current, tableContainerRef.current);

  return (
    <div ref={dropdownContainer} className="tc-table-desktop-actions-dropdown">
      <button
        type="button"
        className="tc-table-desktop-actions-dropdown__button"
        onClick={() => setIsOpened(!isOpened)}
      >
        <span />
      </button>

      {isOpened && ReactDOM.createPortal(
        <div
          ref={dropdownList}
          style={{
            top: listPosition.top + dropdownContainer.current.offsetHeight / 2,
          }}
          className="tc-table-desktop-actions-dropdown__list"
        >
          {
            actions
              .filter((action) => action.show(rowWithValues))
              .map((action) => (
                <button
                  key={`${action.name}-${rowWithValues.id}`}
                  type="button"
                  className="tc-table-desktop-actions-dropdown__action"
                  onClick={(e) => {
                    setIsOpened(!isOpened);

                    if (action.onClick) {
                      action.onClick(e, rowWithValues);
                    }
                  }}
                >
                  {
                    action.renderIcon && (
                      <span className="tc-table-desktop-actions-dropdown__action-icon">
                        {action.renderIcon(rowWithValues)}
                      </span>
                    )
                  }

                  {action.renderText(rowWithValues)}
                </button>
              ))
            }
        </div>,
        tableContainerRef.current,
      )}
    </div>
  );
}

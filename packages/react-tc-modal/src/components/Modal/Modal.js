import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Button } from '@tourmalinecore/react-tc-ui-kit';

import * as classList from '../../helpers/classList';
import { ReactComponent as IconCross } from '../../assets/images/icon-cross.svg';

import Overlay from '../Overlay/Overlay';

import { i18n } from '../../i18n/i18n';

import './Modal.css';

const OPENED_CLASSNAME = 'tc-modal-opened';

export default function Modal({
  style = {},
  className = '',
  customHeader,
  title,
  subtitle,
  content,
  icon,
  overlay,
  maxWidth = 600,
  noPaddingBody = false,
  portalTarget = document.body,
  parentOpenClassName = OPENED_CLASSNAME,
  isLoading,
  isButtonsDisabled,
  onClose,
  showApply,
  onApply = () => {},
  applyText,
  showCancel,
  onCancel = onClose,
  cancelText,
  language = 'en',
}) {
  useEffect(() => {
    const escFunction = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    classList.add(portalTarget, parentOpenClassName);
    document.addEventListener('keydown', escFunction, false);

    return () => {
      classList.remove(portalTarget, parentOpenClassName);
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  const {
    cancelLabel,
    applyLabel,
    closeIconTitle,
  } = i18n(language);

  const noPaddingBodyClass = noPaddingBody ? 'tc-modal__body--no-padding' : '';

  return ReactDOM.createPortal(
    <>
      {
        overlay
        && <Overlay />
      }
      <div style={style} className={`tc-modal ${className}`}>
        <div
          className="tc-modal__container"
          style={{
            maxWidth,
          }}
        >
          <div className="tc-modal__content">
            <div className="tc-modal__header">
              {
                customHeader
                  ? customHeader(onClose)
                  : (
                    <>
                      {
                        icon && (
                          <span className="tc-modal__header-icon">
                            {icon}
                          </span>
                        )
                      }
                      <div className="tc-modal__title-group">
                        <div className="tc-modal__title">{title}</div>
                        {
                          subtitle
                          && <div className="tc-modal__subtitle">{subtitle}</div>
                        }
                      </div>
                      <button
                        type="button"
                        className="tc-modal__close-button"
                        title={closeIconTitle}
                        onClick={onClose}
                      >
                        <IconCross />
                      </button>
                    </>
                  )
              }
            </div>
            <div className={`tc-modal__body ${noPaddingBodyClass}`}>
              {content}
            </div>
            <div className="tc-modal__footer">
              <div className="tc-modal__buttons">
                {
                  showCancel
                  && (
                  <Button
                    className="tc-modal__button"
                    color="secondary"
                    disabled={isButtonsDisabled}
                    isLoading={isLoading}
                    onClick={onCancel}
                  >
                    {cancelText || cancelLabel}
                  </Button>
                  )
                }
                {
                  showApply
                  && (
                  <Button
                    className="tc-modal__button"
                    color="primary"
                    disabled={isButtonsDisabled}
                    isLoading={isLoading}
                    onClick={onApply}
                  >
                    {applyText || applyLabel}
                  </Button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    portalTarget,
  );
}

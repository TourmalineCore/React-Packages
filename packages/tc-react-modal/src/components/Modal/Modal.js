import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Button } from '@tourmalinecore/tc-react-ui-kit';

import * as classList from '../../helpers/classList';

import IconCross from '../../assets/images/icon-cross.svg';
import Overlay from '../Overlay/Overlay';

import './Modal.css';

const strings = {
  ru: {
    cancelLabel: 'Отмена',
    applyLabel: 'Применить',
  },
  en: {
    cancelLabel: 'Cancel',
    applyLabel: 'Apply',
  },
};

const OPENED_CLASSNAME = 'tc-modal-opened';

export default function Modal({
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
  } = strings[language];

  const noPaddingBodyClass = noPaddingBody ? 'tc-modal__body--no-padding' : '';

  return ReactDOM.createPortal(
    <>
      {
        overlay
        && <Overlay />
      }
      <section className="tc-modal">
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
                        <h2 className="tc-modal__title">{title}</h2>
                        {
                          subtitle
                          && <h3 className="tc-modal__subtitle">{subtitle}</h3>
                        }
                      </div>
                      <button
                        type="button"
                        className="tc-modal__close-button"
                        title="Close tc-modal window"
                        onClick={onClose}
                      >
                        <img src={IconCross} alt="close popup" />
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
                    simple
                    className="tc-modal__button"
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
      </section>
    </>,
    portalTarget,
  );
}

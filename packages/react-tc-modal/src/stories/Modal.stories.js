import React from 'react';
import {
  withKnobs, text, number, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Modal } from '..';

export default {
  title: 'Modal',
  decorators: [withKnobs],
  component: Modal,
};

export const Standard = () => (
  <Modal
    overlay={boolean('overlay', true)}
    title={text('title', 'Modal title')}
    subtitle={text('subtitle', 'Modal subtitle')}
    icon={boolean('icon', true)
      ? (
        <svg width="18" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {/* eslint-disable-next-line max-len */}
          <path d="M1 .9h0v.6s0 0 0 0l5.8 7v6.4c0 .2 0 .4.3.5h0a.6.6 0 00.5 0h0l3.3-1.6s0 0 0 0c.2 0 .3-.3.3-.5h0V8.5l5.8-7a.6.6 0 00-.5-1h-15C1.3.5 1 .7 1 1zm9.2 7s0 0 0 0l-.2.4s0 0 0 0v4.6l-2 1V8.3a.6.6 0 00-.2-.4l-5-6.2h12.5l-5.1 6.2z" fill="#27293D" stroke="#27293D" strokeWidth=".2" />
        </svg>
      )
      : false}
    content={(
      <div
        style={boolean('bigContent', false) ? {
          height: 600,
          backgroundColor: '#dadada',
        } : {}}
      >
        Text content
      </div>
    )}
    maxWidth={number('maxWidth', undefined)}
    noPaddingBody={boolean('noPaddingBody', false)}
    onClose={action('onClose')}
    showApply={boolean('showApply', true)}
    onApply={action('onApply')}
    applyText={text('applyText', undefined)}
    showCancel={boolean('showCancel', true)}
    onCancel={action('onCancel')}
    cancelText={text('cancelText', undefined)}
    language={text('language', 'en')}
  />
);

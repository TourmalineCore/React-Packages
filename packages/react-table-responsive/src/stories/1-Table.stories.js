import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { handlers } from '../mocks/handlers';
import { worker } from '../../../../.msw/browser';

import { ClientDataTable, ServerDataTable } from './tableComponents';

export default {
  title: 'Table',
  decorators: [
    (Story) => {
      worker.use(...handlers);

      return <Story />;
    },
    withKnobs,
  ],
};

export const ClientSideDesktop = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      fontWeight: 300,
      color: '#172f3d',
    }}
  >
    <ClientDataTable
      loading={boolean('loading', false)}
      isStriped={boolean('isStriped', false)}
      language={text('Language', 'en')}
    />
  </div>
);

export const ClientSideMobile = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      fontWeight: 300,
      color: '#172f3d',
    }}
  >
    <ClientDataTable
      loading={boolean('loading', false)}
      language={text('Language', 'en')}
    />
  </div>
);

ClientSideMobile.parameters = {
  viewport: { defaultViewport: 'iphone5' },
};

export const ServerSideDesktop = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      fontWeight: 300,
      color: '#172f3d',
    }}
  >
    <p>This table server-side behavior implemented with Mock Service Worker. Not all backend features presented by resolve handlers</p>
    <p>Open dev console to check requests</p>

    <ServerDataTable />
  </div>
);

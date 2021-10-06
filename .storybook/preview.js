import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
});

if (typeof global.process === 'undefined') {
  const { worker } = require('../.msw/browser.js');

  const isGHPages = location.href.includes('github.io');

  worker.start({
    serviceWorker: {
      url: 'mockServiceWorker.js',
    },
    options: {
      scope: isGHPages ? '/React-Packages' : '',
    },
  });
}
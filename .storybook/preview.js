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

  worker.start({
    serviceWorker: {
      url: location.href.includes('github.io')
        ? 'React-Packages/mockServiceWorker.js'
        : 'mockServiceWorker.js',
    }
  });
}
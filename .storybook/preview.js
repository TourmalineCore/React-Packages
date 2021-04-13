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
  const { worker } = require('./browser.js');

  worker.start();
}
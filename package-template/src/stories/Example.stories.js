import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { Example } from '..';

export default {
  title: 'Examples',
  decorators: [withKnobs],
};

export const Example1 = () => (
  <Example text={text('exampleText', 'this is knob text')} />
);

import React, { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { Button, NativeSelect, Input } from '..';

export default {
  title: 'UI Kit',
  decorators: [withKnobs],
};

export const Buttons = () => (
  <>
    <h2>Buttons:</h2>

    <Button
      style={{
        marginRight: 16,
      }}
      disabled={boolean('disabled', false)}
    >
      {text('buttonText', 'Button')}
    </Button>

    <Button
      style={{
        marginRight: 16,
      }}
      simple
      disabled={boolean('disabled', false)}
    >
      {text('buttonText', 'Button')}
    </Button>

    <Button
      cancel
      disabled={boolean('disabled', false)}
    >
      {text('buttonText', 'Button')}
    </Button>
  </>
);

export const InputExample = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <h2>Simple Input:</h2>

      <Input
        type={text('inputType', 'text')}
        placeholder=""
        value={inputValue}
        disabled={boolean('disabled', false)}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
};

export const NativeSelectExample = () => {
  const [selectedValue, setSelectedValue] = useState();

  return (
    <>
      <h2>Native Select:</h2>

      <NativeSelect
        value={selectedValue}
        options={[{ label: 'option1', value: 1 }, { label: 'option2', value: 2 }]}
        onChange={(option) => { setSelectedValue(option.value); }}
      />
    </>
  );
};

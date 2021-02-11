import React, { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import {
  Button, NativeSelect, Input, CheckField,
} from '..';

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
      onClick={action('onClick')}
    >
      {text('buttonText', 'Button')}
    </Button>

    <Button
      style={{
        marginRight: 16,
      }}
      simple
      disabled={boolean('disabled', false)}
      onClick={action('onClick')}
    >
      {text('buttonText', 'Button')}
    </Button>

    <Button
      cancel
      disabled={boolean('disabled', false)}
      onClick={action('onClick')}
    >
      {text('buttonText', 'Button')}
    </Button>
  </>
);

export const InputExample = () => {
  const [inputValue, setInputValue] = useState('');
  const onChangeActionHandler = action('onChange');

  return (
    <>
      <h2>Simple Input:</h2>

      <Input
        type={text('inputType', 'text')}
        label={text('labelText', 'Label')}
        placeholder=""
        value={inputValue}
        disabled={boolean('disabled', false)}
        isInvalid={boolean('isInvalid', false)}
        validationMessages={[text('validationMessages', 'Validation Message')]}
        isMessagesAbsolute={boolean('isMessagesAbsolute', false)}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChangeActionHandler(e);
        }}
      />
    </>
  );
};

export const NativeSelectExample = () => {
  const [selectedValue, setSelectedValue] = useState();
  const onChangeActionHandler = action('onChange');

  return (
    <>
      <h2>Native Select:</h2>

      <NativeSelect
        value={selectedValue}
        options={[{ label: 'option1', value: 1 }, { label: 'option2', value: 2 }]}
        onChange={(option) => {
          setSelectedValue(option.value);
          onChangeActionHandler(option);
        }}
      />
    </>
  );
};

const checkFieldsData = {
  1: 'label-1',
  2: 'label-2',
};

export const CheckFieldExample = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set());
  const [selectedRadio, setSelectedRadio] = useState();
  const onChangeActionHandler = action('onChange');

  return (
    <>
      <h2>As checkboxes:</h2>

      {Object.entries(checkFieldsData).map(([value, label]) => (
        <CheckField
          key={value}
          style={{
            marginBottom: 16,
          }}
          disabled={boolean('disabled', false)}
          label={label}
          checked={selectedCheckboxes.has(value)}
          onChange={(e) => {
            onChangeActionHandler(e);
            setSelectedCheckboxes((prevSelected) => {
              if (prevSelected.has(value)) {
                return new Set([...prevSelected].filter((x) => x !== value));
              }

              return new Set([...prevSelected, value]);
            });
          }}
        />
      ))}

      <h2>As radiobuttons:</h2>

      {Object.entries(checkFieldsData).map(([value, label]) => (
        <CheckField
          key={value}
          style={{
            marginBottom: 16,
          }}
          viewType="radio"
          disabled={boolean('disabled', false)}
          label={label}
          checked={value === selectedRadio}
          onChange={(e) => {
            onChangeActionHandler(e);
            setSelectedRadio(value);
          }}
        />
      ))}
    </>
  );
};

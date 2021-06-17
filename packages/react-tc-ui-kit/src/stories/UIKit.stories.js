import React, { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import {
  Button, NativeSelect, Input, CheckField,
} from '..';

export default {
  title: 'UI Kit',
  decorators: [
    withKnobs,
    (Story) => <div style={{ fontFamily: 'sans-serif', color: '#172f3d' }}><Story /></div>,
  ],
};

export const Buttons = () => (
  <>
    <h2>Buttons:</h2>

    <Button
      style={{
        marginRight: 16,
      }}
      disabled={boolean('disabled', false)}
      isLoading={boolean('isLoading', false)}
      onClick={action('onClick')}
    >
      {text('buttonText', 'Button')}
    </Button>

    <Button
      style={{
        marginRight: 16,
      }}
      color="primary"
      disabled={boolean('disabled', false)}
      isLoading={boolean('isLoading', false)}
      onClick={action('onClick')}
    >
      {text('buttonText', 'Button')}
    </Button>

    <Button
      style={{
        marginRight: 16,
      }}
      color="danger"
      disabled={boolean('disabled', false)}
      isLoading={boolean('isLoading', false)}
      onClick={action('onClick')}
    >
      {text('buttonText', 'Button')}
    </Button>

    <Button
      color="secondary"
      disabled={boolean('disabled', false)}
      isLoading={boolean('isLoading', false)}
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
        isValid={boolean('isValid', false)}
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
        label={text('labelText', 'Native Select')}
        value={selectedValue}
        options={[
          { label: 'option1', value: 1 },
          { label: 'option2', value: 2 },
          { label: 'option3', value: 3, disabled: true },
        ]}
        onChange={(option, e) => {
          setSelectedValue(option.value);
          onChangeActionHandler(option, e);
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

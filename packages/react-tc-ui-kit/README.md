# Tourmaline Core UI-Kit

## exports from package

### Button
```JSX
import { Button } from '@tourmalinecore/react-tc-ui-kit';

<Button
  style={}
  className="" // additional classname
  type="button" // button(default), submit
  disabled={false} // boolean
  isLoading={false} // loading state
  onClick={(event) => {}}

  // button style modifier
  // available values: 'primary', 'secondary', 'danger'
  color=""
>
  text or jsx
</Button>
```

### Input
default password toggler icons used from [Pixel perfect](https://www.flaticon.com/authors/pixel-perfect)

```JSX
import { Input } from '@tourmalinecore/tc-ui-kit';

const [inputValue, setInputValue] = useState('');

<Input
  inputRef={{}} // react ref for input element
  style={}
  id="input_id"
  className="" // additional classname
  type="text"
  actionButton = { // optional, adding icon and function
    icon: null,
    callback: (e) => {},
    buttonProps: {}, // you can throw additional attributes
  }
  label="text"
  disabled={false}
  value={inputValue}
  placeholder=""
  isValid={} // display valid state, could be useful in some cases
  isInvalid={false} // // display invalid state
  validationMessages={[]}
  isMessagesAbsolute={false} // should messages be positioned absolutely?
  viewTogglerIcons={[<IconIdle />, <IconActive />]} // optional, custom icons for password visibility toggler
  onChange={(event) => setInputValue(event.target.value)}
/>
```

### Native Select
```JSX
import { NativeSelect } from '@tourmalinecore/react-tc-ui-kit';

<NativeSelect
  style={}
  className="" // additional classname
  label="text"
  value="" // selected value
  options={[{ label: 'option1', value: 1, ...attrs }, { label: 'option2', value: 2, disabled: true }]}
  onChange={(option, event) => {}} // option: {label: String, value: String | Number}
/>
```

### Check Field
```JSX
import { CheckField } from '@tourmalinecore/react-tc-ui-kit';

<CheckField
  style={}
  className="" // additional classname
  viewType="" // 'checkbox' or 'radio', defaults to 'checkbox' if not specified
  disabled={false}
  label="label text"
  checked={false}
  onChange={(e) => {}}
/>
```

### Textarea
```JSX
import { Textarea } from '@tourmalinecore/react-tc-ui-kit';

const [textareaValue, setTextareaValue] = useState('');

<Textarea
  inputRef={{}} // react ref for textarea element
  style={}
  id="textarea_id"
  className="" // additional classname
  label="text"
  disabled={false}
  value={textareaValue}
  maxLength={} // add restrictions on the maximum number of characters entered
  autoSize = {false} // automatically increases the textarea height
  placeholder=""
  isValid={} // display valid state, could be useful in some cases
  isInvalid={false} // // display invalid state
  validationMessages={[]}
  isMessagesAbsolute={false} // should messages be positioned absolutely?
  onChange={(event) => setTextareaValue(event.target.value)}
/>
```

## Do not forget to import styles if needed
Styles can be imported once (e.g.: in your root component)

you can set css var `--tc-controls-primary-color` to redefine primary button color and hover/focus color effects

```JSX
import '@tourmalinecore/react-tc-ui-kit/es/index.css';
```
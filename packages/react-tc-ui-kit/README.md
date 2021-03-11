# Tourmaline Core UI-Kit

## exports from package

### Button
```JSX
import { Button } from '@tourmalinecore/react-tc-ui-kit';

<Button
  style={}
  type="button" // button(default), submit
  className="" // additional classname
  disabled={false} // boolean
  onClick={(event) => {}}

  // button style modifiers
  cancel // border blue
  add // border light blue
  delete // border red
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
  value="" // selected value
  options={[{ label: 'option1', value: 1 }, { label: 'option2', value: 2 }]}
  onChange={(option) => {}} // {label: String, value: String | Number}
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

## Do not forget to import styles if needed
Styles can be imported once (e.g.: in your root component)

```JSX
import '@tourmalinecore/react-tc-ui-kit/es/index.css';
```
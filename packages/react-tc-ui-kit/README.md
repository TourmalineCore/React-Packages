# Tourmaline Core UI-Kit
## exports from package

Button
```JSX
import { Button } from '@tourmalinecore/react-tc-ui-kit';

<Button
  style={}
  type="button" // button(default), submit
  className="" // additional classname
  disabled={false} // boolean
  onClick={(event) => {}}

  // button style modifiers
  simple // transparent bg
  cancel // red bg
>
  text or jsx
</Button>
```

Input
```JSX
import { Input } from '@tourmalinecore/tc-ui-kit';

const [inputValue, setInputValue] = useState('');

<Input
  style={}
  id="input_id"
  className="" // additional classname
  type="text"
  value={inputValue}
  placeholder=""
  disabled={false}
  onChange={(event) => setInputValue(event.target.value)}
/>
```

Native Select
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

## Do not forget to import styles if needed
```JSX
import '@tourmalinecore/react-tc-ui-kit/index.css';
```
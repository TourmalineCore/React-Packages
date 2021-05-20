# Tourmaline Core react modal component

Modal dialog component for React.JS

## [Demo](https://tourmalinecore.github.io/React-Packages/?path=/story/modal--standard)

# Instalation

The package can be installed via npm:
```
npm install @tourmalinecore/react-tc-modal --save
```

Or via yarn:
```
yarn add @tourmalinecore/react-tc-modal
```

### Do not forget to import styles if you want to use the default styling.
should be imported once in your root component
```JSX
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-tc-ui-kit/es/index.css';
```

> **NOTE**:  You may want to re-style on your own. In that case you don't have to import the styles. 

# Examples

**Simple Message:**
```JSX
import React from 'react';
import { Modal } from '@tourmalinecore/react-tc-modal';

function MessageModal({}){
  return (
    <Modal
      title="Important message!"
      content="You are now reading an important message."
      showApply={false}
      onCancel={false}
    />
  );
}
```

**Confimation:**
```JSX
function ConfimationModal({onConfirm, onCancel, onClose}){
  return (
    <Modal
      className="confirm-modal" 
      title="Confirmation"
      content="Are you sure you want to continue?"
      onApply={onConfirm}
      applyText="Confirm"
      onCancel={onCancel}
      cancelText="Cancel"
      onClose={onClose}
    />
  );
}
```

**Form:**
```JSX
const [name, setName] = useState('');

return ( 
  <Modal
    className="confirm-modal" 
    title="Registration"
    subtitle="Fill the form to complete the registration"
    content={(
      <div> 
        <input 
          type="text" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
    )}
    onApply={sendForm}
    applyText="Register"
    onCancel={onCancel}
    cancelText="Cancel"
  />
);
```

# Configuration

| Name | Type | Default | Description |
|-|-|-|-|
| style | Object | {} | Additional  style |
| className | String | "" | Additional classname |
| customHeader | Function(onClose) => JSX |  | Replaces title and subtitle container |
| title | String / JSX | null |  Modal's title |
| subtitle | String / JSX | null | Modal's subtitle |
| content | String / JSX | null | Modal's content |
| language | String / Object | "en" | en/ru or Object, see example here(TODO file link) |
| icon | JSX | () => {} | Heading title icon |
| overlay | Boolean | true |  |
| maxWidth | Int | 600 | Max width for modal body, pass null for no style |
| noPaddingBody | Boolean | false | Determines should modal body have padding |
| portalTarget | Object | document.body | Portal target |
| parentOpenClassName | String | "tc-modal-opened" | ClassName for portalTarget on modal opened |
| onClose | Function | () => {} | Triggered when modal closed |
| isLoading | Boolean | false | If true, dispalays loader on the buttons |
| showApply | Boolean | true | Show the Apply button |
| onApply | Function | () => {} | OnClick handler for the Apply button |
| applyText | String | "Apply" | Text for the Apply button |
| showCancel | Boolean | true | Show the Cancel button |
| onCancel | Function | () => {} | OnClick handler for the Cancel button |
| cancelText | String | "Cancel" | Text for the Cancel button |
| isButtonsDisabled | Boolean | false | Disabled state for both Cancel and Apply buttons |
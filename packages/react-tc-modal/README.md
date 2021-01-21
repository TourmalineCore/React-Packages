# Tourmaline Core react modal component

```JSX
import { Modal } from '@tourmalinecore/react-tc-modal';

<Modal
  customHeader={(onClose) => {}} // it will replace title and subtitle
  title="title text or jsx"
  subtitle="subtitle text or jsx"
  content="content text or jsx"
  icon={() => ()} // heading title icon
  overlay={true}
  maxWidth={600} // max width for modal body
  noPaddingBody={false} // should modal body have padding?
  portalTarget={document.body} // portal target
  parentOpenClassName="tc-modal-opened" // className for portalTarget on modal opened
  onClose={() => {}}
  showApply={true} // show apply button
  onApply={() => {}}
  applyText="text for apply btn"
  showCancel={true} // show cancel button
  onCancel={() => {}} // defaults to onClose
  cancelText="text for cancel button"
  language = 'en' // en/ru or Object, see example here(TODO file link)
/>
```

## Do not forget to import styles if needed
```JSX
import '@tourmalinecore/react-tc-modal/index.css';
import '@tourmalinecore/react-tc-ui-kit/index.css';
```
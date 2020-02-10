# react-spring-modal

A component library for animatable and accessible modals built with react-spring. Built to be composable to create any transition that matches your needs.

✅ Supports SSR
<br>
✅ Handles focus restoration
<br>
✅ Prevents focus on covered content via `inert` attribute; includes polyfill
<br>
✅ Animatable via `react-spring`'s `useTransition`

## Usage

### Installation

When you install `react-spring-modal` you'll need to make sure that you have also installed `react`, `react-dom` and `react-spring`.

Note: this package uses React's hooks feature, so you'll need to have at least `react@18.0.0` or up.

```bash
pnpm i react-spring-modal react react-dom react-spring

# or

yarn add react-spring-modal react react-dom react-spring
```

### Example

To use this package you'll need to choose a modal and import the CSS file.

```typescript jsx
import { useState } from 'react';
import { BottomModal } from 'react-spring-modal';
import 'react-spring-modal/dist/index.css';

function App() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <BottomModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <h1>The Modal</h1>
      </BottomModal>
    </>
  );
}
```

You might notice that `<BottomModal>` doesn't render to anything. Due to the use of React DOM's `createPortal` all modals that use `<ModalPortal>` (i.e. the ones packaged with this module) will render to `#modal-root`. You'll need something like this in your HTML:

```html
<div id="root"></div> <!-- This was probably already here -->
<div id="modal-root"></div> <!-- This is where modals will render to -->
```

You can also create your own modal with it's own transition:

```typescript jsx
import { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { BaseModal } from 'react-spring-modal';

function MyModal() {
  const [isOpen, setOpen] = useState(false);
  const transition = useTransition(isOpen, null, {
    from: { transform: 'scale(0)' },
    enter: { transform: 'scale(1)' },
    leave: { transform: 'scale(0)' }
  });

  return (
    <BaseModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <h1>My Modal</h1>
            </animated.div>
          )
      )}
    </BaseModal>
  );
}
```

### API

#### `<ModalPortal>`

Requires that an element with the id `modal-root` exists.

| Name     | Description              |
| -------- | ------------------------ |
| children | Rendered into the portal |

#### `<ModalBackdrop>`

Any props allowed. This element basically just renders `animated.div` and passes the props to it.

| Name    | Type            | Description                                                       |
| ------- | --------------- | ----------------------------------------------------------------- |
| onClick | (Event) => void | Only fires when the backdrop itself is clicked, not its children. |

#### `<BaseModal>`

For custom modals `<BaseModal>` should be used as it handles accessibility via the `inert` attribute and handles restoring focus.

| Name           | Type       | Description                                                                    |
| -------------- | ---------- | ------------------------------------------------------------------------------ |
| isOpen         | Boolean    | Used to determine open and closed state for `useTransition`                    |
| onRequestClose | () => void | Used to close the modal when clicking on the backdrop or pressing ESC (escape) |
| autoFocus      | Boolean    | When true, this will focus on the first focusable element when the modal opens |

#### `<BottomModal>` and `<CenterModal>`

Built-in custom modals.

- `<BottomModal>` slides in from the bottom of the screen and stays attached to the bottom.
- `<CenterModal>` fades in and is positioned in the center.

Shares props with `<BaseModal>`

| Name            | Type                             | Description                                |
| --------------- | -------------------------------- | ------------------------------------------ |
| modalTransition | ReturnType<typeof useTransition> | Replaces the transition used for the modal |
  
## FAQ

* Why won't my modal render when `isOpen` is set to `true`?

  You most likely haven't placed a `<div id="modal-root"></div>` within your HTML file. Without this, the modal doesn't know where to render to. If that doesn't fix the issue, feel free to open a new issue on this repository.

* Why am I getting `ReferenceError: globalThis is not defined`?
  
  You're using this library in an environment that does not support the `globalThis` keyword out-of-the-box. You will need to **use a polyfill for `globalThis`** to fix the error. I recommend that you use [@ungap/global-this](https://github.com/ungap/global-this)

* How do I prevent the modal from automatically focusing on the first focusable element once my modal has opened?

  The solution here is to set the property `autoFocus` on your `<BaseModal>`, `<CenterModal>`, or `<BottomModal>` to `false` like so:

  ```typescript jsx
  <BaseModal autoFocus={false} isOpen={...} onRequestClose={...}>
    ...
  </BaseModal>
  ```

## License

License MIT © [Christopher H. Brown](https://github.com/ChrisBrownie55)

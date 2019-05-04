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

```jsx
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

You can also create your own modal with it's own transition:

```jsx
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

#### `<BottomModal>` and `<CenterModal>`

Built-in custom modals.

- `<BottomModal>` slides in from the bottom of the screen and stays attached to the bottom.
- `<CenterModal>` fades in and is positioned in the center.

Shares props with `<BaseModal>`

| Name            | Type                             | Description                                |
| --------------- | -------------------------------- | ------------------------------------------ |
| modalTransition | ReturnType<typeof useTransition> | Replaces the transition used for the modal |

## License

License MIT © [Christopher H. Brown](https://github.com/ChrisBrownie55)

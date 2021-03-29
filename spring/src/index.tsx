import {
  Children,
  cloneElement,
  ComponentProps,
  ComponentType,
  createContext,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useContext,
  useMemo,
  useState,
  isValidElement
} from 'react';

import { animated, useTransition, UseTransitionProps } from 'react-spring';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { useId } from '@reach/auto-id';

export const AnimatedDialogOverlay = animated(DialogOverlay);
export const AnimatedDialogContent = animated(DialogContent);

const emptyObject = {};
type CssTransitionProps = UseTransitionProps<boolean, CSSProperties>;
interface ModalTransition {
  initial?: CssTransitionProps['initial'];
  from?: CssTransitionProps['from'];
  enter?: CssTransitionProps['enter'];
  leave?: CssTransitionProps['leave'];
}

/**
 * Input: `{ opacity: 0 }`
 * Output: `{ 'overlay__opacity': 0 }`
 */
function prefixProperties(
  prefix: string,
  props: ModalTransition['initial'] | ModalTransition['from'] | ModalTransition['enter'] | ModalTransition['leave']
): Object {
  if (typeof props === 'object' && props !== null) {
    return Object.fromEntries(Object.entries(props).map(([key, value]) => [`${prefix}__${key}`, value]));
  }

  return emptyObject;
}

/**
 * Input: `{ 'overlay__opacity': 0, other: 'stuff' }`
 * Output: `{ opacity: 0 }`
 */
function removePropertyPrefixes(prefix: string, props: Object): Object {
  return Object.fromEntries(
    Object.entries(props)
      .filter(([key]) => key.startsWith(prefix + '__'))
      .map(([key, value]) => [key.replace(prefix + '__', ''), value])
  );
}

const defaultOverlayTransition: ModalTransition = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 }
};

type ReplacePartial<Type, Keys> = { [key in Exclude<keyof Type, Keys>]: Type[key] } &
  { [key in keyof Type]?: Type[key] | undefined };
type OverlayProps = HTMLAttributes<Element> & ReplacePartial<ComponentProps<typeof AnimatedDialogOverlay>, 'as'>;
type ContentProps = HTMLAttributes<Element> & ReplacePartial<ComponentProps<typeof AnimatedDialogContent>, 'as'>;

interface ModalContextState {
  labelId?: string;
  onDismiss?: (event?: React.SyntheticEvent) => void;
}
const ModalContext = createContext<ModalContextState>({});

interface BaseModalProps {
  isOpen: boolean;
  onDismiss?: (event?: React.SyntheticEvent) => void;
  children: ReactNode;
  dangerouslyBypassFocusLock?: boolean;
  overlayProps?: OverlayProps;
  overlayTransition?: ModalTransition;
  contentProps?: ContentProps;
  contentTransition?: ModalTransition;
  transitionConfig?: Omit<CssTransitionProps, 'initial' | 'from' | 'enter' | 'leave'> & {
    onRest?: (isOpen: boolean, animationStatus: string) => void;
  };
  labelId?: string;
}
export function BaseModal({
  isOpen,
  onDismiss,
  children,
  dangerouslyBypassFocusLock,
  overlayProps: {
    style: overlayStyle = emptyObject,
    className: overlayClassName = '',
    ...otherOverlayProps
  } = emptyObject,
  overlayTransition = defaultOverlayTransition,
  contentProps: {
    style: contentStyle = emptyObject,
    className: contentClassName = '',
    ...otherContentProps
  } = emptyObject,
  contentTransition,
  transitionConfig = emptyObject,
  labelId
}: BaseModalProps) {
  const [status, setStatus] = useState('focus-unlocked');
  const values = useMemo(
    () =>
      ({
        initial: {
          ...prefixProperties('overlay', overlayTransition?.initial),
          ...prefixProperties('content', contentTransition?.initial)
        },
        from: {
          ...prefixProperties('overlay', overlayTransition?.from),
          ...prefixProperties('content', contentTransition?.from)
        },
        enter: {
          ...prefixProperties('overlay', overlayTransition?.enter),
          ...prefixProperties('content', contentTransition?.enter)
        },
        leave: {
          ...prefixProperties('overlay', overlayTransition?.leave),
          ...prefixProperties('content', contentTransition?.leave)
        },
        ...transitionConfig,
        onRest(isOpen: boolean, animationStatus: string) {
          if (typeof transitionConfig.onRest === 'function') {
            transitionConfig?.onRest(isOpen, animationStatus);
          }
          if (animationStatus === 'update') setStatus(isOpen ? 'focus-locked' : 'focus-unlocked'); // if done opening, lock focus. if done closing, unlock focus
        }
      } as ModalTransition),
    [overlayTransition, contentTransition, transitionConfig]
  );
  const transition = useTransition(isOpen, null, values);
  labelId = useId(labelId);

  // If the dev doesn't set `dangerouslyBypassFocusLock`, use our status
  if (dangerouslyBypassFocusLock === undefined) dangerouslyBypassFocusLock = status === 'focus-unlocked';

  return (
    <ModalContext.Provider value={{ labelId, onDismiss }}>
      {transition.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedDialogOverlay
              key={key}
              as="div"
              onDismiss={onDismiss}
              dangerouslyBypassFocusLock={dangerouslyBypassFocusLock}
              style={{
                ...removePropertyPrefixes('overlay', styles),
                ...overlayStyle
              }}
              className={`ModalOverlay ${overlayClassName}`}
              {...otherOverlayProps}
            >
              <AnimatedDialogContent
                as="div"
                style={{
                  ...removePropertyPrefixes('content', styles),
                  ...contentStyle
                }}
                className={`ModalContent ${contentClassName}`}
                aria-labelledby={labelId}
                {...otherContentProps}
              >
                {children}
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </ModalContext.Provider>
  );
}

/** Modal Utility Components */

interface ModalTitleProps extends HTMLAttributes<Element> {
  as?: ComponentType | keyof JSX.IntrinsicElements;
  children: ReactNode;
}
export function ModalTitle({ as: Component = 'h1', id, ...props }: ModalTitleProps) {
  const { labelId } = useContext(ModalContext);
  return <Component id={id || labelId} {...props} />;
}

interface ModalCloseTargetProps {
  children: ReactNode;
}
export function ModalCloseTarget({ children }: ModalCloseTargetProps) {
  const { onDismiss } = useContext(ModalContext);
  return (
    <>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          const onClick = (event: React.SyntheticEvent) => {
            if (onDismiss) onDismiss(event);
            if (child.props.onClick) child.props.onClick(event);
          };
          return cloneElement(child, { onClick });
        }
        return child;
      })}
    </>
  );
}

/** Pre-built Custom Modals */

export function CenterModal({ overlayProps, contentProps, ...props }: BaseModalProps) {
  return (
    <BaseModal
      overlayProps={{ ...overlayProps, className: 'ModalOverlay--center ' + overlayProps?.className ?? '' }}
      contentProps={{ ...contentProps, className: 'CenterModal ' + contentProps?.className ?? '' }}
      {...props}
    />
  );
}

export function BottomModal({ overlayProps, contentProps, ...props }: BaseModalProps) {
  return (
    <BaseModal
      overlayProps={{ ...overlayProps, className: 'ModalOverlay--bottom ' + overlayProps?.className ?? '' }}
      contentProps={{ ...contentProps, className: 'BottomModal ' + contentProps?.className ?? '' }}
      contentTransition={{
        initial: { transform: 'translateY(100%)' },
        from: { transform: 'translateY(100%)' },
        enter: { transform: 'translateY(0%)' },
        leave: { transform: 'translateY(100%)' }
      }}
      {...props}
    />
  );
}

interface ExpandModalProps extends BaseModalProps {
  x?: number;
  y?: number;
}
export function ExpandModal({ overlayProps, contentProps, x = 50, y = 50, ...props }: ExpandModalProps) {
  return (
    <BaseModal
      overlayProps={{ ...overlayProps, className: 'ExpandModal__overlay ' + overlayProps?.className }}
      contentTransition={{
        from: { clipPath: `circle(0% at ${x}% ${y}%)` },
        enter: { clipPath: `circle(100% at ${x}% ${y}%)` },
        leave: { clipPath: `circle(0% at ${x}% ${y}%)` }
      }}
      contentProps={{
        ...contentProps,
        className: 'ExpandModal ' + contentProps?.className ?? ''
      }}
      {...props}
    />
  );
}

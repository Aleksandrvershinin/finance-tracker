import clsx from 'clsx'
import { useRef } from 'react'
import { Transition } from 'react-transition-group'

interface Props {
  isOpen?: boolean
  className?: string
  children?: React.ReactNode
  duration?: number
}
const defaultClasses =
  'fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-10'

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: {},
}

function ModalOpacity({
  isOpen = true,
  children,
  duration = 300,
  className,
  ...rest
}: Props) {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }
  const nodeRef = useRef(null)
  return (
    <Transition unmountOnExit nodeRef={nodeRef} in={isOpen} timeout={duration}>
      {(state) => (
        <div
          ref={nodeRef}
          className={clsx(defaultClasses, className)}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          {...rest}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}

export default ModalOpacity

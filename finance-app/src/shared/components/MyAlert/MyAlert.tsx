import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ErrorIcon from './ErrorIcon'
import clsx from 'clsx'
import { Transition } from 'react-transition-group'
import CancelIcon from '../ui/icons/CancelIcon'

type Props = {
    text: string
    type: 'error' | 'success'
    onCloseCallback?: () => void
}
const duration = 300
const transitionStyles = {
    entering: { transform: 'translateX(-20px)' },
    entered: { transform: 'translateX(-20px)' },
    exiting: { transform: 'translateX(105%)' },
    exited: { transform: 'translateX(105%)' },
    unmounted: {},
}
const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
}
function MyAlert({ type, text, onCloseCallback }: Props) {
    const [isClient, setIsClient] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const nodeRef = useRef(null)
    const timerId = useRef<NodeJS.Timeout | null>(null)
    useEffect(() => {
        setIsClient(true)
        setTimeout(() => {
            setIsOpen(true)
        }, 20)
    }, [])

    const handleClick = useCallback(() => {
        setIsOpen(false)
        if (onCloseCallback) {
            setTimeout(onCloseCallback, duration)
        }
    }, [onCloseCallback])

    useEffect(() => {
        timerId.current = setTimeout(handleClick, 4000)
        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current)
            }
        }
    }, [handleClick])
    if (!isClient) {
        return null
    }

    const classDefault = `p-2 fixed flex items-center gap-x-5 rounded-xl top-5 right-0 z-50 border translate-x-[105%]`
    const classNames = clsx(
        classDefault,
        type === 'error' && 'text-[--red-200] border-[--red-200] bg-[--red-50]',
    )
    return createPortal(
        <Transition
            unmountOnExit={true}
            nodeRef={nodeRef}
            in={isOpen}
            timeout={duration}
        >
            {(state) => (
                <div
                    ref={nodeRef}
                    className={classNames}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                    }}
                >
                    {type === 'error' && <ErrorIcon />}
                    <p>{text}</p>
                    <button onClick={handleClick} className="w-5 h-5">
                        <CancelIcon
                            transition={false}
                            strokeWidth="1"
                        ></CancelIcon>
                    </button>
                </div>
            )}
        </Transition>,
        document.body,
    )
}

export default MyAlert

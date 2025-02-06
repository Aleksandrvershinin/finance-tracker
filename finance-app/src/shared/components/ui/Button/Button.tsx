import React from 'react'
import clsx from 'clsx'
import { variants, type Variants } from './variants'

// Интерфейс для пропсов компонента
interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        Variants {
    children?: React.ReactNode
}

export default function Button({
    children,
    padding,
    className,
    rounded,
    myColor,
    ...rest
}: Props) {
    return (
        <button
            className={clsx(variants({ myColor, padding, rounded }), className)}
            {...rest}
        >
            {children}
        </button>
    )
}

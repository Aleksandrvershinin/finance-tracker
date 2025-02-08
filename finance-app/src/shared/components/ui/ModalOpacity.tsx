import clsx from 'clsx'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface ModalOpacityProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    duration?: number
}

const ModalOpacity = (props: ModalOpacityProps) => {
    const { children, className, duration = 0.3, ...rest } = props
    const classes = clsx(
        className,
        'fixed inset-0 bg-black bg-opacity-50 z-10 overflow-auto',
    )
    return (
        <motion.div
            {...rest}
            className={classes}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
        >
            {children}
        </motion.div>
    )
}

export default ModalOpacity

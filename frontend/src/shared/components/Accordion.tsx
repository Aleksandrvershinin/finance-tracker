import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionProps {
    children: React.ReactNode
    renderTitle: (
        handleSwitch: () => void,
        icon: React.ReactNode,
        isOpen: boolean,
    ) => React.ReactNode
    className?: string
    handleSwitch?: () => void
    isOpen?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
    renderTitle,
    children,
    className,
    handleSwitch: handleSwitchProps,
    isOpen: isOpenProps,
}) => {
    const [internalOpen, setInternalOpen] = useState(false)

    const isControlled = isOpenProps !== undefined
    const isOpen = isControlled ? isOpenProps : internalOpen

    const handleSwitch = () => {
        if (isControlled) {
            handleSwitchProps?.()
        } else {
            setInternalOpen((prev) => !prev)
        }
    }

    return (
        <div className={clsx(className)}>
            {renderTitle(
                handleSwitch,
                <FaChevronDown
                    className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />,
                isOpen,
            )}

            <motion.div
                initial={false}
                animate={{
                    overflow: isOpen ? 'visible' : 'hidden',
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Accordion

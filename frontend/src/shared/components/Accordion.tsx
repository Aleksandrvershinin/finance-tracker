import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionProps {
    children: React.ReactNode
    renderTitle: (
        handleSwitch: () => void,
        icon: React.ReactNode,
    ) => React.ReactNode
    className?: string
}

const Accordion: React.FC<AccordionProps> = ({
    renderTitle,
    children,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSwitch = () => {
        setIsOpen((prev) => !prev)
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
            )}

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Accordion

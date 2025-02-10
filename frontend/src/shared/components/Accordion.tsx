import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionProps {
    title: string
    children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border rounded-xl overflow-hidden shadow-md">
            <button
                className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold">{title}</span>
                <FaChevronDown
                    className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`transition-[max-height] duration-300 overflow-hidden ${
                    isOpen ? 'max-h-screen' : 'max-h-0'
                }`}
            >
                <div className="p-4">{children}</div>
            </div>
        </div>
    )
}

export default Accordion

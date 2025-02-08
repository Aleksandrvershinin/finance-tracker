import Portal from '@/shared/components/Portal'
import Button from '@/shared/components/ui/Button/Button'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TransactionForm from './TransactionForm'

function AddTransaction() {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleOpen = () => {
        setIsOpen(true)
    }
    return (
        <>
            <Button
                onClick={handleOpen}
                className="w-full"
                myColor="softPurple"
            >
                Добавить операцию
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        <ModalOpacity onClick={handleClose}>
                            <div
                                className="w-fit mx-auto mt-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <TransactionForm handleClose={handleClose} />
                            </div>
                        </ModalOpacity>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    )
}

export default AddTransaction

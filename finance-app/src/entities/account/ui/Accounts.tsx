import Button from '@/shared/components/ui/Button/Button'
import AccountList from './AccountList'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import AddAccount from './AddAccount/AddAccount'

function Accounts() {
    const [showForm, setShowForm] = useState(false)
    const handleOpen = () => {
        setShowForm(true)
    }
    const handleClose = () => {
        setShowForm(false)
    }
    return (
        <div>
            <div className="flex gap-x-10 mb-10 items-center">
                <p className="text-xl">Счета</p>
                <Button onClick={handleOpen} myColor="green500">
                    Добавить
                </Button>
            </div>
            <AccountList />
            <AnimatePresence>
                {showForm && (
                    <Portal>
                        <ModalOpacity onClick={handleClose}>
                            <div
                                className="w-fit mx-auto mt-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <AddAccount handleClose={handleClose} />
                            </div>
                        </ModalOpacity>
                    </Portal>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Accounts

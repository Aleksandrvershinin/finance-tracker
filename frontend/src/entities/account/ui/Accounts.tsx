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
        <div className="flex flex-col gap-y-5">
            <h2 className="text-2xl font-bold">Счета</h2>
            <AccountList />
            <Button onClick={handleOpen} myColor="green500">
                Добавить счет
            </Button>
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

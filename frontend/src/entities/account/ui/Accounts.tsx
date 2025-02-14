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
            <div className="p-4 rounded-2xl shadow-my-soft bg-white lg:p-0 lg:rounded-none lg:shadow-none lg:bg-none">
                <AccountList />
                <Button
                    className="w-full mt-4"
                    onClick={handleOpen}
                    myColor="green500"
                >
                    Добавить счет
                </Button>
            </div>

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

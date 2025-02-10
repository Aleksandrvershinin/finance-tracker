import { useState } from 'react'
import { TAccount } from '../../types/account.types'
import { FaEdit } from 'react-icons/fa'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import AddAccount from '../AddAccount/AddAccount'

interface Props {
    account: TAccount
}

function EditBtn({ account }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleOpen = () => {
        setIsOpen(true)
    }
    return (
        <>
            <button
                className="ml-auto"
                onClick={handleOpen}
                title="Редактировать счет"
            >
                <FaEdit className="text-blue-500" size={23} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        <ModalOpacity>
                            <div className="w-fit mx-auto mt-10">
                                <AddAccount
                                    account={account}
                                    handleClose={handleClose}
                                ></AddAccount>
                            </div>
                        </ModalOpacity>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    )
}

export default EditBtn

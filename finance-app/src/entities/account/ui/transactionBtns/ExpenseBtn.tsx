import Button from '@/shared/components/ui/Button/Button'
import ArrowIcon from '@/shared/components/ui/icons/ArrowIcon'
import { TAccount } from '../../types/account.types'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import TransactionForm from '@/entities/transaction/ui/TransactionForm'
interface Props {
    accountId: TAccount['id']
}
function ExpenseBtn({ accountId }: Props) {
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
                title="Расход"
                className="!p-1 rounded-full"
                myColor={'red500'}
            >
                <ArrowIcon direction="up" size={20} />
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        <ModalOpacity onClick={handleClose}>
                            <div
                                className="w-fit mx-auto mt-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <TransactionForm
                                    transactionType="EXPENSE"
                                    transactionAccountId={accountId}
                                    handleClose={handleClose}
                                />
                            </div>
                        </ModalOpacity>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    )
}

export default ExpenseBtn

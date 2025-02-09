import Button from '@/shared/components/ui/Button/Button'
import { TAccount } from '../../types/account.types'
import ArrowIcon from '@/shared/components/ui/icons/ArrowIcon'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import TransactionForm from '@/entities/transaction/ui/TransactionForm'
import { useState } from 'react'

interface Props {
    accountId: TAccount['id']
}

function IncomeBtn({ accountId }: Props) {
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
                title="Приход"
                className="!p-1 rounded-full"
                myColor={'green500'}
            >
                <ArrowIcon direction="down" size={20} />
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
                                    transactionType="INCOME"
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

export default IncomeBtn

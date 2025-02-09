import Button from '@/shared/components/ui/Button/Button'
import { TAccount } from '../../types/account.types'
import ArrowIcon from '@/shared/components/ui/icons/ArrowIcon'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import TransferForm from '@/entities/transfer/ui/TransferForm'
import { useState } from 'react'

interface Props {
    accountId: TAccount['id']
}

function TransferBtn({ accountId }: Props) {
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
                title="Перевод"
                className="!p-1 rounded-full"
                myColor={'softPurple'}
            >
                <ArrowIcon direction="right" size={20} />
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <Portal>
                        <ModalOpacity>
                            <div className="w-fit mx-auto mt-10">
                                <TransferForm
                                    transferId={accountId}
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

export default TransferBtn

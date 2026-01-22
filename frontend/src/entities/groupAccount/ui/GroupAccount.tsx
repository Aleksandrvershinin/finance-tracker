import Button from '@/shared/components/ui/Button/Button'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import AccountTagsForm from './GroupAccountForm'
import AccountTagsList from './GroupAccountList'
import { TGroupAccount } from '../types/groupAccount.types'

export default function GroupAccount() {
    const [showForm, setShowForm] = useState(false)
    const [accountTag, setAccountTag] = useState<TGroupAccount | undefined>(
        undefined,
    )
    const handleEditClick = (accountTag: TGroupAccount) => {
        setAccountTag(accountTag)
        setShowForm(true)
    }
    const handleOpen = () => {
        setShowForm(true)
    }
    const handleClose = () => {
        setShowForm(false)
        setAccountTag(undefined)
    }
    return (
        <>
            <Button className="mb-4" onClick={handleOpen} myColor="green500">
                Добавить
            </Button>
            <AccountTagsList
                handleClose={handleClose}
                handleEditClick={handleEditClick}
            />
            <AnimatePresence>
                {showForm && (
                    <Portal>
                        <ModalOpacity>
                            <div className="w-fit mx-auto mt-10">
                                <AccountTagsForm
                                    data={accountTag}
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

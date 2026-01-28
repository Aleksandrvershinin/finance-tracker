import Button from '@/shared/components/ui/Button/Button'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import { TTagAccount } from '../types/tagAccount.types'
import TagAccountList from './TagAccountList'
import TagAccountForm from './TagAccountForm'

export default function TagAccount() {
    const [showForm, setShowForm] = useState(false)
    const [accountTag, setAccountTag] = useState<TTagAccount | undefined>(
        undefined,
    )
    const handleEditClick = (accountTag: TTagAccount) => {
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
        <div className="space-y-2 border border-collapse w-full p-2 rounded">
            <div className="flex gap-x-2 items-center mb-4">
                <Button onClick={handleOpen} myColor="green500">
                    Добавить
                </Button>
                <h2>Теги</h2>
            </div>

            <TagAccountList
                handleClose={handleClose}
                handleEditClick={handleEditClick}
            />
            <AnimatePresence>
                {showForm && (
                    <Portal>
                        <ModalOpacity>
                            <div className="w-fit mx-auto mt-10">
                                <TagAccountForm
                                    data={accountTag}
                                    handleClose={handleClose}
                                />
                            </div>
                        </ModalOpacity>
                    </Portal>
                )}
            </AnimatePresence>
        </div>
    )
}

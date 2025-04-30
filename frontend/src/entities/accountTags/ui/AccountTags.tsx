import Button from '@/shared/components/ui/Button/Button'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import AccountTagsForm from './AccountTagsForm'
import AccountTagsList from './AccountTagsList'
import { TAccountTag } from '../types/accountTags.types'

export default function AccountTags() {
    const [showForm, setShowForm] = useState(false)
    const [accountTag, setAccountTag] = useState<TAccountTag | undefined>(
        undefined,
    )
    const handleEditClick = (accountTag: TAccountTag) => {
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

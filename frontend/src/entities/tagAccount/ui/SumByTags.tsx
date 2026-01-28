import { useAccountsByTag } from '@/entities/account/lib/useAccountsByTag'
import { TAccount } from '@/entities/account/types/account.types'
import { useAuth } from '@/entities/auth/lib/useAuth'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TagAccountForm from './TagAccountForm'
import { TTagAccount } from '../types/tagAccount.types'
import { FaEdit } from 'react-icons/fa'

type Props = {
    accounts: TAccount[]
}

export const SumByTags = ({ accounts }: Props) => {
    const [accountTag, setAccountTag] = useState<TTagAccount | null>(null)
    const { data: user } = useAuth()
    const sumByTag = useAccountsByTag(accounts)
    const handleClose = () => {
        setAccountTag(null)
    }
    const handleClick = (accountTag: TTagAccount) => {
        setAccountTag(accountTag)
    }
    return (
        <>
            {sumByTag.length > 0 && (
                <div className="font-bold mb-5">
                    <div className="space-y-2">
                        {sumByTag.map((tag) => (
                            <div
                                key={tag.id}
                                style={{ backgroundColor: tag.color }}
                                className="flex justify-between rounded-2xl p-2 text-white"
                            >
                                <div className="flex gap-x-2">
                                    <p>{tag.name}</p>
                                    <p>{tag.total.toLocaleString()}</p>
                                    <p>{user?.currency.symbol}</p>
                                </div>

                                <button
                                    title="Редактировать"
                                    onClick={() => {
                                        handleClick(tag)
                                    }}
                                >
                                    <FaEdit
                                        className="text-blue-500"
                                        color=""
                                        size={20}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <AnimatePresence>
                {accountTag && (
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
        </>
    )
}

import { useAccountsByTag } from '@/entities/account/lib/useAccountsByTag'
import { TAccount } from '@/entities/account/types/account.types'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TagAccountForm from '../TagAccountForm'
import { TTagAccount } from '../../types/tagAccount.types'
import Accordion from '@/shared/components/Accordion'
import { useTagAccountStore } from '../../lib/useTagAccountStore'
import { useSortedTagAccounts } from '../../lib/useSortedTagAccounts'
import { DraggableSumAccounTagList } from './DraggableSumAccounTagList'

type Props = {
    accounts: TAccount[]
}

export const SumByTags = ({ accounts }: Props) => {
    const { hiddenTags, toggleAccountGroup } = useTagAccountStore()
    const [accountTag, setAccountTag] = useState<TTagAccount | null>(null)
    const tagAccountsWithSum = useAccountsByTag(accounts)
    const sortedAccounts = useSortedTagAccounts(tagAccountsWithSum)
    const handleClose = () => {
        setAccountTag(null)
    }
    const handleClick = (accountTag: TTagAccount) => {
        setAccountTag(accountTag)
    }
    return (
        <>
            {sortedAccounts.length > 0 && (
                <div className="mb-5 p-4 space-y-4 rounded-2xl shadow-my-soft">
                    <Accordion
                        isOpen={!hiddenTags}
                        handleSwitch={() => toggleAccountGroup(!hiddenTags)}
                        renderTitle={(handleSwitch, icon) => (
                            <div
                                onClick={handleSwitch}
                                className="flex justify-between mb-4 cursor-pointer"
                            >
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Суммы по тегам
                                </h2>
                                <div className="flex items-center gap-x-2">
                                    {icon}
                                </div>
                            </div>
                        )}
                    >
                        <div className="font-bold mb-5">
                            <div className="space-y-2">
                                <DraggableSumAccounTagList
                                    accounts={sortedAccounts}
                                    handleClickForEdit={handleClick}
                                />
                            </div>
                        </div>
                    </Accordion>
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

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { GroupedAccounts } from '../lib/groupingAccounts'
import SortableAccountCard from './AccountCard/SortableAccountCard'
import Accordion from '@/shared/components/Accordion'
import { useAuth } from '@/entities/auth/lib/useAuth'
import { useAccountStore } from '../lib/useAccountStore'

type Props = {
    group: GroupedAccounts
}

export const AccountGroupCard = ({ group }: Props) => {
    const { data: user } = useAuth()
    const hiddenGroups = useAccountStore((s) => s.hiddenAccountGroupIds)
    const toggleGroup = useAccountStore((s) => s.toggleAccountGroup)
    return (
        <div className="p-4 rounded-2xl shadow-my-soft bg-white">
            <Accordion
                isOpen={!hiddenGroups[group.id]}
                handleSwitch={() => toggleGroup(group.id)}
                renderTitle={(handleSwitch, icon) => (
                    <div
                        onClick={handleSwitch}
                        className="flex items-center justify-between mb-4 cursor-pointer"
                    >
                        <h2 className="text-lg font-semibold text-gray-700">
                            {group.name}
                        </h2>
                        <div className="flex items-center gap-x-2">
                            <div className="text-green-600 font-bold flex gap-x-1">
                                <div>{group.total.toLocaleString()}</div>
                                <div>{user?.currency.symbol}</div>
                            </div>
                            {icon}
                        </div>
                    </div>
                )}
            >
                <SortableContext
                    items={group.accounts.map((a) => a.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="flex flex-col gap-y-5">
                        {group.accounts.map((item) => (
                            <SortableAccountCard
                                groupId={group.id}
                                key={item.id}
                                account={item}
                            />
                        ))}
                    </div>
                </SortableContext>
            </Accordion>
        </div>
    )
}

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { GroupedAccounts } from '../lib/useGroupedAccounts'
import Accordion from '@/shared/components/Accordion'
import { useAccountStore } from '../lib/useAccountStore'
import { useAuth } from '@/entities/auth/lib/useAuth'
import SortableAccountCard from './AccountCard/SortableAccountCard'

type AccountGroupProps = {
    group: GroupedAccounts
}

export function AccountGroup({ group }: AccountGroupProps) {
    const { data: user } = useAuth()
    const hiddenGroups = useAccountStore((s) => s.hiddenAccountGroupIds)
    const toggleGroup = useAccountStore((s) => s.toggleAccountGroup)
    return (
        <div className="p-4 rounded-2xl shadow-my-soft bg-white">
            <SortableContext
                items={group.accounts.map((a) => a.id)}
                strategy={verticalListSortingStrategy}
            >
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
                                <p className="text-green-600 font-bold flex gap-x-1">
                                    <p>{group.total.toLocaleString()}</p>
                                    <p>{user?.currency.symbol}</p>
                                </p>
                                {icon}
                            </div>
                        </div>
                    )}
                >
                    <div className="flex flex-col gap-y-5">
                        {group.accounts
                            .slice()
                            .sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <SortableAccountCard
                                    key={item.id}
                                    account={item}
                                />
                            ))}
                    </div>
                </Accordion>
            </SortableContext>
        </div>
    )
}

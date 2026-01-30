import { GroupedAccounts } from '../lib/groupingAccounts'
import { AccountGroupCard } from './AccountGroupCard'

type AccountGroupProps = {
    groups: GroupedAccounts[]
}

export function AccountGroups({ groups }: AccountGroupProps) {
    return (
        <div className="flex flex-col gap-y-8">
            {groups.map((group) => (
                <AccountGroupCard key={group.name} group={group} />
            ))}
        </div>
    )
}

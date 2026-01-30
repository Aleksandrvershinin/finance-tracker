import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AccountCard from './AccountCard'
import { TAccount } from '../../types/account.types'
import { GroupedAccounts } from '../../lib/groupingAccounts'
interface AccountCardProps {
    account: TAccount
    groupId: GroupedAccounts['id']
}
const SortableAccountCard = ({ account, groupId }: AccountCardProps) => {
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: account.id,
            data: {
                groupId: groupId,
            },
        })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style}>
            <AccountCard
                attributes={attributes}
                listeners={listeners}
                account={account}
            />
        </div>
    )
}

export default SortableAccountCard

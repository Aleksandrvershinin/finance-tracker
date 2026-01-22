import Loading from '@/shared/components/Loading'
import AccountCard from './AccountCard/AccountCard'
import { useAccountList } from '../lib/useAccountList'
import { useAuth } from '@/entities/auth/lib/useAuth'
import { useFilterAccounts } from '@/features/Filter/lib/useFilterAccounts'
import { useGroupedAccounts } from '../lib/useGroupedAccounts'
import { useSortedAccounts } from '../lib/useSortedAccounts'

function AccountList() {
    const { data: accounts = [], isLoading } = useAccountList()
    const { data: user } = useAuth()
    const filteredAccounts = useFilterAccounts(accounts)

    const groupedAccounts = useGroupedAccounts(filteredAccounts)
    const sortedAccounts = useSortedAccounts(groupedAccounts)

    const total = filteredAccounts.reduce((acc, item) => acc + item.balance, 0)

    return (
        <>
            <div className="mb-5 p-4 space-y-4 rounded-2xl shadow-my-soft bg-green-100">
                <div className="flex items-center gap-x-2 text-xl text-green-600 font-bold px-4">
                    <p>Общая сумма:</p>
                    <p>{total.toLocaleString()}</p>
                    <p>{user?.currency.symbol}</p>
                </div>
            </div>

            <div className="flex flex-col gap-y-8">
                {sortedAccounts.map((group) => (
                    <div key={group.name}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                {group.name}
                            </h2>
                            <p className="text-green-600 font-bold">
                                {group.total.toLocaleString()}{' '}
                                {user?.currency.symbol}
                            </p>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            {group.accounts.map((item) => (
                                <AccountCard key={item.id} account={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Loading isShow={isLoading} />
        </>
    )
}

export default AccountList

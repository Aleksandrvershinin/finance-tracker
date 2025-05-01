import { useAccountStore } from '../lib/useAccountStore'
import { useUserStore } from '@/entities/user/lib/useUserStore'
import Loading from '@/shared/components/Loading'
import AccountCard from './AccountCard/AccountCard'

function AccountList() {
    const { accounts, filteredAccountIds, isLoading } = useAccountStore()
    const user = useUserStore((state) => state.user)

    const filteredAccounts = accounts.filter((a) =>
        filteredAccountIds.includes(a.id),
    )

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
            <div className="flex flex-col gap-y-5">
                {filteredAccounts.map((item) => (
                    <AccountCard key={item.id} account={item} />
                ))}
            </div>
            <Loading isShow={isLoading} />
        </>
    )
}

export default AccountList

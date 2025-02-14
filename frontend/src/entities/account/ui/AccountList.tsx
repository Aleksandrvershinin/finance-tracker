import { useAccountStore } from '../lib/useAccountStore'
import Loading from '@/shared/components/Loading'
import AccountCard from './AccountCard/AccountCard'
import { useUserStore } from '@/entities/user/lib/useUserStore'

function AccountList() {
    const { accounts, isLoading } = useAccountStore()
    const user = useUserStore((state) => state.user)
    const total = accounts.reduce((acc, item) => acc + item.balance, 0)
    return (
        <>
            <div className="flex items-center gap-x-2 text-xl text-green-600 font-bold mb-5 p-4  rounded-2xl shadow-my-soft bg-green-100">
                <p>Общая сумма:</p>
                <p>{total.toLocaleString()}</p>
                <p>{user?.currency.symbol}</p>
            </div>
            <div className="flex flex-col gap-y-5">
                {accounts.map((item) => (
                    <AccountCard key={item.id} account={item} />
                ))}
            </div>
            <Loading isShow={isLoading} />
        </>
    )
}

export default AccountList

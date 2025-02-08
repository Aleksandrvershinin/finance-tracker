import { useAccountStore } from '../lib/useAccountStore'
import Loading from '@/shared/components/Loading'
import AccountCard from './AccountCard/AccountCard'

function AccountList() {
    const { accounts, isLoading } = useAccountStore()

    return (
        <>
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

import { useEffect } from 'react'
import { useAccountStore } from '../lib/useAccountStore'
import Loading from '@/shared/components/Loading'
import AccountCard from './AccountCard/AccountCard'

function AccountList() {
    const { accounts, isLoading, load } = useAccountStore()
    useEffect(() => {
        load()
    }, [load])

    return (
        <>
            <div className="flex flex-col gap-y-5">
                {accounts.map((item) => (
                    <AccountCard
                        key={item.id}
                        symbol={item.currency.symbol}
                        balance={item.balance}
                        currency={item.currency.code}
                        name={item.name}
                    />
                ))}
            </div>
            <Loading isShow={isLoading} />
        </>
    )
}

export default AccountList

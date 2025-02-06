import { useEffect } from 'react'
import { useAccountStore } from '../lib/useAccountStore'
import Loading from '@/shared/components/Loading'
import { TAccount } from '../types/account.types'
import MyTable from '@/shared/components/ui/MyTable/MyTable'
const headers = [<>Название</>, <>Баланс</>, <>Валюта</>]
function AccountList() {
    const { accounts, isLoading, load } = useAccountStore()
    useEffect(() => {
        load()
    }, [load])
    const renderAccountsRow = (acc: TAccount) => [
        <>{acc.name}</>,
        <>{acc.balance}</>,
        <>{acc.currency.symbol}</>,
    ]
    return (
        <>
            <div className="max-w-[500px]">
                <MyTable
                    headers={headers}
                    renderRow={renderAccountsRow}
                    data={[...accounts]}
                />
            </div>
            <Loading isShow={isLoading} />
        </>
    )
}

export default AccountList

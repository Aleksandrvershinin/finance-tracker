import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useCategoryList } from '@/entities/category/lib/useCategoryList'
import { useCurrencyList } from '@/entities/currency/lib/useCurrencyList'
import { useGroupAccountList } from '@/entities/groupAccount/lib/useGroupAccountList'
import { useTransactionList } from '@/entities/transaction/lib/useTransactiomList'
import { useTrasferList } from '@/entities/transfer/lib/useTrasferList'
import Loading from '@/shared/components/Loading'

function DataLoading() {
    const { isLoading: isLoadingTransactions, error: errorTransactions } =
        useTransactionList()
    const { isLoading: isLoadingCurrencies, error: errorCurrencies } =
        useCurrencyList()
    const { isLoading: isLoadingCategories, error: errorCategories } =
        useCategoryList()
    const { isLoading: isLoadingAccounts, error: errorAccounts } =
        useAccountList()
    const { isLoading: isLoadingGroupAccounts, error: errorGroupAccounts } =
        useGroupAccountList()
    const { isLoading: isLoadingTransfers, error: errorTransfers } =
        useTrasferList()
    const isLoading =
        isLoadingCurrencies &&
        isLoadingCategories &&
        isLoadingAccounts &&
        isLoadingGroupAccounts &&
        isLoadingTransactions &&
        isLoadingTransfers
    if (errorTransfers) {
        console.error(errorTransfers)
    }
    if (errorTransactions) {
        console.error(errorTransactions)
    }
    if (errorCurrencies) {
        console.error(errorCurrencies)
    }
    if (errorCategories) {
        console.error(errorCategories)
    }
    if (errorGroupAccounts) {
        console.error(errorGroupAccounts)
    }
    if (errorAccounts) {
        console.error(errorAccounts)
    }
    return (
        <>
            <Loading isShow={isLoading}></Loading>
        </>
    )
}

export default DataLoading

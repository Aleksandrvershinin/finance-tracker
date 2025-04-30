import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { useAccountTagsStore } from '@/entities/accountTags/lib/useAccountTagsStore'
import { useCategoriesStore } from '@/entities/category/lib/useCategoriesStore'
import { useCurrencyStore } from '@/entities/currency/lib/useCurrencyStore'
import { useTransactionsStore } from '@/entities/transaction/lib/useTransactionStore'
import { useTransfersStore } from '@/entities/transfer/lib/useTransfersStore'
import Loading from '@/shared/components/Loading'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

function DataProvider({ children }: Props) {
    const loadAccounts = useAccountStore((state) => state.load)
    const isLoadingAccounts = useAccountStore((state) => state.isLoading)
    const isLoadingTransactions = useTransactionsStore(
        (state) => state.isLoading,
    )
    const loadTransactions = useTransactionsStore((state) => state.load)
    const loadCurrencies = useCurrencyStore((state) => state.loadCurrencies)
    const isLoadingCurrencies = useCurrencyStore((state) => state.isLoading)
    const isLoadingCategories = useCategoriesStore((state) => state.isLoading)
    const loadCategories = useCategoriesStore((state) => state.load)
    const loadTransfers = useTransfersStore((state) => state.load)
    const isLoadingTransfers = useTransfersStore((state) => state.isLoading)
    const loadAccountTags = useAccountTagsStore((state) => state.load)
    const isLoadingAccountTags = useAccountTagsStore((state) => state.isLoading)
    const isLoading =
        isLoadingCurrencies &&
        isLoadingCategories &&
        isLoadingAccounts &&
        isLoadingTransactions &&
        isLoadingTransfers &&
        isLoadingAccountTags
    useEffect(() => {
        loadCurrencies()
        loadCategories()
        loadAccounts()
        loadTransactions()
        loadTransfers()
        loadAccountTags()
    }, [
        loadCurrencies,
        loadCategories,
        loadAccounts,
        loadTransactions,
        loadTransfers,
        loadAccountTags,
    ])

    return (
        <>
            <Loading isShow={isLoading}></Loading>
            {children}
        </>
    )
}

export default DataProvider

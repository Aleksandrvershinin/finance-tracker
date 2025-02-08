import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { useCategoriesStore } from '@/entities/category/lib/useCategoriesStore'
import { useCurrencyStore } from '@/entities/currency/lib/useCurrencyStore'
import Loading from '@/shared/components/Loading'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

function DataProvider({ children }: Props) {
    const loadAccounts = useAccountStore((state) => state.load)
    const isLoadingAccounts = useAccountStore((state) => state.isLoading)
    const loadCurrencies = useCurrencyStore((state) => state.loadCurrencies)
    const isLoadingCurrencies = useCurrencyStore((state) => state.isLoading)
    const isLoadingCategories = useCategoriesStore((state) => state.isLoading)
    const loadCategories = useCategoriesStore((state) => state.load)
    const isLoading =
        isLoadingCurrencies && isLoadingCategories && isLoadingAccounts
    useEffect(() => {
        loadCurrencies()
        loadCategories()
        loadAccounts()
    }, [loadCurrencies, loadCategories, loadAccounts])

    return (
        <>
            <Loading isShow={isLoading}></Loading>
            {children}
        </>
    )
}

export default DataProvider

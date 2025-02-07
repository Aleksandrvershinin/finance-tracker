import { useCategoriesStore } from '@/entities/category/lib/useCategoriesStore'
import { useCurrencyStore } from '@/entities/currency/lib/useCurrencyStore'
import Loading from '@/shared/components/Loading'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

function DataProvider({ children }: Props) {
    const loadCurrencies = useCurrencyStore((state) => state.loadCurrencies)
    const isLoadingCurrencies = useCurrencyStore((state) => state.isLoading)
    const isLoadingCategories = useCategoriesStore((state) => state.isLoading)
    const loadCategories = useCategoriesStore((state) => state.load)
    const isLoading = isLoadingCurrencies && isLoadingCategories
    useEffect(() => {
        loadCurrencies()
        loadCategories()
    }, [loadCurrencies, loadCategories])

    return (
        <>
            <Loading isShow={isLoading}></Loading>
            {children}
        </>
    )
}

export default DataProvider

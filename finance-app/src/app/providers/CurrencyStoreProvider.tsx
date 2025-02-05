import { useCurrencyStore } from '@/entities/currency/lib/useCurrencyStore'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

function CurrencyStoreProvider({ children }: Props) {
    const loadCurrencies = useCurrencyStore((state) => state.loadCurrencies)
    useEffect(() => {
        loadCurrencies()
    }, [loadCurrencies])

    return <>{children}</>
}

export default CurrencyStoreProvider

import { useCurrencyStore } from '@/entities/currency/lib/useCurrencyStore'
import { TCurrency } from '@/entities/currency/types/currency.types'
import MyTable from '@/shared/components/ui/MyTable/MyTable'

const currencyHeaders = [<>Name</>, <>Code</>, <>Symbol</>]

const CurrencyList = () => {
    const { currencies, loadCurrencies } = useCurrencyStore()
    if (!currencies || currencies.length < 1) {
        return (
            <div className="flex gap-x-2">
                <p>Нет доступных валют.</p>
                <button onClick={loadCurrencies}>Обновить</button>
            </div>
        )
    }
    const renderCurrenciesRow = (currency: TCurrency) => [
        <>{currency.name}</>,
        <>{currency.code}</>,
        <>{currency.symbol}</>,
    ]
    return (
        <div className="max-w-[500px]">
            <MyTable
                headers={currencyHeaders}
                renderRow={renderCurrenciesRow}
                data={[...currencies]}
            />
        </div>
    )
}

export default CurrencyList

import { useCurrencyList } from '@/entities/currency/lib/useCurrencyList'
import { TCurrency } from '@/entities/currency/types/currency.types'
import MyTable from '@/shared/components/ui/MyTable/MyTable'

const currencyHeaders = [<>Name</>, <>Code</>, <>Symbol</>]

const CurrencyList = () => {
    const { data: currencies = [] } = useCurrencyList()

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

import { FilterPanel } from '@/features/Filter/ui/FilterPanel/FilterPanel'
import TransactionsWidget from '@/widgets/TransactionsWidget'

function TransactionsAndTransfers() {
    return (
        <div className="container mb-10">
            <h1 className="text-2xl font-bold mb-4">Операции по счетам</h1>
            <FilterPanel isShowTransactionFilters={true} />
            <TransactionsWidget showReportAmounts={true}></TransactionsWidget>
        </div>
    )
}

export default TransactionsAndTransfers

import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useTransactionList } from '@/entities/transaction/lib/useTransactiomList'
import { useTrasferList } from '@/entities/transfer/lib/useTrasferList'
import { filteringTransactions } from '@/features/Filter/lib/filteringTransactions'
import { filteringTransfers } from '@/features/Filter/lib/filteringTransfers'
import { useFilterAccounts } from '@/features/Filter/lib/useFilterAccounts'
import { useFilterStore } from '@/features/Filter/lib/useFilterStore'
import { FilterPanel } from '@/features/Filter/ui/FilterPanel/FilterPanel'
import TransactionsWidget from '@/widgets/TransactionsWidget'

function TransactionsAndTransfers() {
    const { data: accounts = [] } = useAccountList()
    const filteredAccounts = useFilterAccounts(accounts)
    const { data: transactions = [] } = useTransactionList()
    const { data: transfers = [] } = useTrasferList()
    const selectedMonths = useFilterStore((s) => s.selectedMonths)
    const selectedExpenseTransactionIds = useFilterStore(
        (s) => s.selectedExpenseTransactionIds,
    )
    const selectedIncomeTransactionIds = useFilterStore(
        (s) => s.selectedIncomeTransactionIds,
    )
    const selectedTypeTransaction = useFilterStore(
        (s) => s.selectedTypeTransaction,
    )

    const filteredTransfers = filteringTransfers({
        accounts: filteredAccounts,
        months: selectedMonths,
        transfers,
    })
    const filteredTransactions = filteringTransactions({
        accounts: filteredAccounts,
        months: selectedMonths,
        transactions,
        expenseTransactionIds: selectedExpenseTransactionIds,
        incomeTransactionIds: selectedIncomeTransactionIds,
        typeTransaction: selectedTypeTransaction || undefined,
    })
    return (
        <div className="container mb-10">
            <h1 className="text-2xl font-bold mb-4">Операции по счетам</h1>
            <FilterPanel isShowTransactionFilters={true} />
            <TransactionsWidget
                transfers={filteredTransfers}
                transactions={filteredTransactions}
                showReportAmounts={true}
            />
        </div>
    )
}

export default TransactionsAndTransfers

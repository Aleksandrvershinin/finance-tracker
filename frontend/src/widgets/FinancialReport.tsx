import { useAccountList } from '@/entities/account/lib/useAccountList'
import TransactionsWidget from './TransactionsWidget'
import { useFilterAccounts } from '@/features/Filter/lib/useFilterAccounts'
import { useTransactionList } from '@/entities/transaction/lib/useTransactiomList'
import { useTrasferList } from '@/entities/transfer/lib/useTrasferList'
import { useFilterStore } from '@/features/Filter/lib/useFilterStore'
import { filteringTransfers } from '@/features/Filter/lib/filteringTransfers'
import { filteringTransactions } from '@/features/Filter/lib/filteringTransactions'

function FinancialReport() {
    const { data: accounts = [] } = useAccountList()
    const filteredAccounts = useFilterAccounts(accounts)
    const { data: transactions = [] } = useTransactionList()
    const { data: transfers = [] } = useTrasferList()
    const selectedMonths = useFilterStore((s) => s.selectedMonths)
    const filteredTransfers = filteringTransfers({
        accounts: filteredAccounts,
        months: selectedMonths,
        transfers,
    })
    const filteredTransactions = filteringTransactions({
        accounts: filteredAccounts,
        months: selectedMonths,
        transactions,
    })
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Финансовый отчет</h2>
            <TransactionsWidget
                transactions={filteredTransactions}
                transfers={filteredTransfers}
                showReportAmounts
            ></TransactionsWidget>
        </div>
    )
}

export default FinancialReport

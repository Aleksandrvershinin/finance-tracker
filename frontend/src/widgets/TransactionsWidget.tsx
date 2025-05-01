import { useTransactionsStore } from '@/entities/transaction/lib/useTransactionStore'
import TransactionsTable from '@/entities/transaction/ui/TransactionsTable'
import { useTransfersStore } from '@/entities/transfer/lib/useTransfersStore'
import TrasfersTable from '@/entities/transfer/ui/TrasfersTable'
import ReportAmounts from './ReportAmounts'
import { useAccountStore } from '@/entities/account/lib/useAccountStore'

interface Props {
    showReportAmounts: boolean
}

export default function TransactionsWidget({ showReportAmounts }: Props) {
    const transactions = useTransactionsStore((state) => state.transactions)
    const transfers = useTransfersStore((state) => state.transfers)
    const filteredIds = useAccountStore((s) => s.filteredAccountIds)
    const selectedMonths = useAccountStore((s) => s.selectedMonths)

    const filteredTransactions = transactions.filter((t) => {
        const isCorrectMonth =
            selectedMonths.length > 0
                ? selectedMonths.some((month) => t.date.startsWith(month))
                : true
        const isCorrectAccount =
            filteredIds.length > 0 ? filteredIds.includes(t.accountId) : true
        return isCorrectMonth && isCorrectAccount
    })

    const filteredTransfers = transfers.filter((t) => {
        const isCorrectMonth =
            selectedMonths.length > 0
                ? selectedMonths.some((month) => t.date.startsWith(month))
                : true
        const isCorrectAccount =
            filteredIds.length > 0
                ? filteredIds.includes(t.fromAccountId) ||
                  filteredIds.includes(t.toAccountId)
                : true
        return isCorrectMonth && isCorrectAccount
    })

    return (
        <div className="space-y-10 p-4 rounded-2xl shadow-my-soft bg-white">
            <div className="space-y-10">
                {showReportAmounts && (
                    <ReportAmounts
                        transactions={filteredTransactions}
                    ></ReportAmounts>
                )}
                <TransactionsTable
                    transactions={filteredTransactions}
                ></TransactionsTable>
                <TrasfersTable transfers={filteredTransfers}></TrasfersTable>
            </div>
        </div>
    )
}

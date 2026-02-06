import TransactionsTable from '@/entities/transaction/ui/TransactionsTable'
import TrasfersTable from '@/entities/transfer/ui/TrasfersTable'
import ReportAmounts from './ReportAmounts'
import { TTransfer } from '@/entities/transfer/types/transfer.types'
import { TTransaction } from '@/entities/transaction/types/transaction.types'

interface Props {
    showReportAmounts: boolean
    transactions: TTransaction[]
    transfers: TTransfer[]
}

export default function TransactionsWidget({
    transactions,
    transfers,
    showReportAmounts,
}: Props) {
    return (
        <div className="space-y-10 p-4 rounded-2xl shadow-my-soft bg-white">
            <div className="space-y-10">
                {showReportAmounts && (
                    <ReportAmounts transactions={transactions}></ReportAmounts>
                )}
                <TransactionsTable
                    transactions={transactions}
                ></TransactionsTable>
                <TrasfersTable transfers={transfers}></TrasfersTable>
            </div>
        </div>
    )
}

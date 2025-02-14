import TransactionsWidget from '@/widgets/TransactionsWidget'

function TransactionsAndTransfers() {
    return (
        <div className="container mb-10">
            <h1 className="text-2xl font-bold mb-4">Операции по счетам</h1>
            <TransactionsWidget
                isFilterigAccounts
                showReportAmounts={false}
            ></TransactionsWidget>
        </div>
    )
}

export default TransactionsAndTransfers

import TransactionsWidget from './TransactionsWidget'

function FinancialReport() {
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Финансовый отчет</h2>
            <TransactionsWidget
                isFilterigAccounts={false}
                showReportAmounts
            ></TransactionsWidget>
        </div>
    )
}

export default FinancialReport

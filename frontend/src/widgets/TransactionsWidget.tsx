import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { useTransactionsStore } from '@/entities/transaction/lib/useTransactionStore'
import TransactionsTable from '@/entities/transaction/ui/TransactionsTable'
import { useTransfersStore } from '@/entities/transfer/lib/useTransfersStore'
import TrasfersTable from '@/entities/transfer/ui/TrasfersTable'
import { useState } from 'react'
import Select from 'react-select'
import ReportAmounts from './ReportAmounts'

const months = Array.from({ length: 12 }, (_, index) => {
    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - index) // Отнимаем months от текущей даты
    return {
        value: currentDate.toISOString().slice(0, 7), // Формат yyyy-mm
        label: `${currentDate.toLocaleString('default', {
            month: 'long',
        })} ${currentDate.getFullYear()}`, // Название месяца
    }
})
interface Props {
    showReportAmounts: boolean
    isFilterigAccounts: boolean
}
export default function TransactionsWidget({
    showReportAmounts,
    isFilterigAccounts,
}: Props) {
    const transactions = useTransactionsStore((state) => state.transactions)
    const transfers = useTransfersStore((state) => state.transfers)
    const accounts = useAccountStore((state) => state.accounts)
    const [selectedAccounId, setselectedAccounId] = useState<string | null>(
        null,
    )
    const [selectedMonth, setSelectedMonth] = useState<string>(
        new Date().toISOString().slice(0, 7),
    )
    const accountOptions = accounts.map((item) => ({
        label: item.name,
        value: item.id.toString(),
    }))

    const filteredTransactions = transactions.filter((t) => {
        const isCorrectMonth = t.date.startsWith(selectedMonth)
        const isCorrectAccount = selectedAccounId
            ? t.accountId.toString() === selectedAccounId
            : true
        return isCorrectMonth && isCorrectAccount
    })

    const filteredTransfers = transfers.filter((t) => {
        const isCorrectMonth = t.date.startsWith(selectedMonth)
        const isCorrectAccount = selectedAccounId
            ? t.fromAccountId.toString() === selectedAccounId ||
              t.toAccountId.toString() === selectedAccounId
            : true
        return isCorrectMonth && isCorrectAccount
    })
    return (
        <div className="space-y-10 p-4 rounded-2xl shadow-my-soft bg-white">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 max-w-[400px]">
                    <label className="block mb-2 font-medium">
                        Выберите месяц:
                    </label>
                    <Select
                        isClearable
                        options={months}
                        value={months.find(
                            (month) => month.value === selectedMonth,
                        )}
                        onChange={(selectedOption) =>
                            setSelectedMonth(selectedOption?.value || '')
                        }
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                    />
                </div>
                {isFilterigAccounts && (
                    <div className="flex-1 max-w-[400px]">
                        <label className="block mb-2 font-medium">
                            Выберите счет:
                        </label>
                        <Select
                            isClearable
                            options={accountOptions}
                            value={accountOptions.find(
                                (account) => account.value === selectedMonth,
                            )}
                            onChange={(selectedOption) =>
                                setselectedAccounId(selectedOption?.value || '')
                            }
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                        />
                    </div>
                )}
            </div>
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

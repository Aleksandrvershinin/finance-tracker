import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { useTransactionsStore } from '@/entities/transaction/lib/useTransactionStore'
import { useState } from 'react'
import Select from 'react-select'
import ReportAmounts from './ReportAmounts'
import TransactionsTable from '@/entities/transaction/ui/TransactionsTable'

// Формируем массив месяцев для Select
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

function FinancialReport() {
    const transactions = useTransactionsStore((state) => state.transactions)
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

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Финансовый отчет</h2>
            <div className="p-4 rounded-2xl shadow-my-soft bg-whit">
                <div className="flex gap-x-4">
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                </div>
                <div className="space-y-10">
                    <ReportAmounts
                        transactions={filteredTransactions}
                    ></ReportAmounts>
                    <TransactionsTable
                        transactions={filteredTransactions}
                    ></TransactionsTable>
                </div>
            </div>
        </div>
    )
}

export default FinancialReport

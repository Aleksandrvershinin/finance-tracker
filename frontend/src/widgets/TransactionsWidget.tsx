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
    currentDate.setDate(1)
    currentDate.setMonth(currentDate.getMonth() - index)
    return {
        value: currentDate.toISOString().slice(0, 7),
        label: `${currentDate.toLocaleString('default', {
            month: 'long',
        })} ${currentDate.getFullYear()}`,
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
    const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([])
    const [selectedMonths, setSelectedMonths] = useState<string[]>([
        new Date().toISOString().slice(0, 7),
    ])

    const accountOptions = accounts.map((item) => ({
        label: item.name,
        value: item.id.toString(),
    }))

    const filteredTransactions = transactions.filter((t) => {
        const isCorrectMonth =
            selectedMonths.length > 0
                ? selectedMonths.some((month) => t.date.startsWith(month))
                : true
        const isCorrectAccount =
            selectedAccountIds.length > 0
                ? selectedAccountIds.includes(t.accountId.toString())
                : true
        return isCorrectMonth && isCorrectAccount
    })

    const filteredTransfers = transfers.filter((t) => {
        const isCorrectMonth =
            selectedMonths.length > 0
                ? selectedMonths.some((month) => t.date.startsWith(month))
                : true
        const isCorrectAccount =
            selectedAccountIds.length > 0
                ? selectedAccountIds.includes(t.fromAccountId.toString()) ||
                  selectedAccountIds.includes(t.toAccountId.toString())
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
                        isMulti
                        isClearable
                        options={months}
                        value={months.filter((month) =>
                            selectedMonths.includes(month.value),
                        )}
                        onChange={(selectedOption) =>
                            setSelectedMonths(
                                selectedOption
                                    ? selectedOption.map((o) => o.value)
                                    : [],
                            )
                        }
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                    />
                </div>
                {isFilterigAccounts && (
                    <div className="flex-1 max-w-[400px]">
                        <label className="block mb-2 font-medium">
                            Выберите счета:
                        </label>
                        <Select
                            isMulti
                            isClearable
                            options={accountOptions}
                            value={accountOptions.filter((account) =>
                                selectedAccountIds.includes(account.value),
                            )}
                            onChange={(selectedOption) =>
                                setSelectedAccountIds(
                                    selectedOption
                                        ? selectedOption.map((o) => o.value)
                                        : [],
                                )
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

import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { useTransactionsStore } from '../lib/useTransactionStore'
import { TTransaction } from '../types/transaction.types'
import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { useCategoriesStore } from '@/entities/category/lib/useCategoriesStore'

const headers = [
    <>Счет</>,
    <>Категория</>,
    <>Сумма</>,
    <>Дата</>,
    <>Тип</>,
    <>Коментарий</>,
]
const TransactionsTable: React.FC = () => {
    const transactions = useTransactionsStore((state) => state.transactions)
    const accounts = useAccountStore((state) => state.accounts)
    const categories = useCategoriesStore((state) => state.categories)
    const renderCurrenciesRow = (t: TTransaction) => [
        <>
            {accounts.find((acc) => acc.id === t.accountId)?.name ||
                'Не найдено'}
        </>,
        <>
            {categories.find((ct) => ct.id === t.categoryId)?.name ||
                'Не найдено'}
        </>,
        <>{t.amount.toLocaleString()}</>,
        <>{t.date}</>,
        <>{getCategoryType(t.type)}</>,
        <>{t.comment}</>,
    ]
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Транзакции</h2>
            <div className="p-4 rounded-2xl shadow-my-soft bg-white">
                <MyTable
                    headers={headers}
                    renderRow={renderCurrenciesRow}
                    data={[...transactions]}
                />
            </div>
        </div>
    )
}

export default TransactionsTable

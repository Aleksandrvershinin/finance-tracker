import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { TTransaction } from '../types/transaction.types'
import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { useCategoriesStore } from '@/entities/category/lib/useCategoriesStore'
import { FaEdit } from 'react-icons/fa'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import TransactionForm from './TransactionForm'
import { useState } from 'react'
import DeleteTransaction from './DeleteTransaction'
import clsx from 'clsx'
import Accordion from '@/shared/components/Accordion'

const headers = [
    'Дата',
    'Тип',
    'Счет',
    'Категория',
    'Сумма',
    'Коментарий',
    'Действия',
]

interface Props {
    transactions: TTransaction[]
}

const TransactionsTable: React.FC<Props> = ({ transactions }) => {
    const [transaction, setTransaction] = useState<TTransaction | null>(null)
    const accounts = useAccountStore((state) => state.accounts)
    const categories = useCategoriesStore((state) => state.categories)
    const handleClose = () => {
        setTransaction(null)
    }
    const handleOpen = (transaction: TTransaction) => {
        setTransaction(transaction)
    }
    const renderCurrenciesRow = (t: TTransaction) => {
        const account = accounts.find((acc) => acc.id === t.accountId)
        const category = categories.find((ct) => ct.id === t.categoryId)
        return [
            t.date.split('T')[0],
            <p
                className={clsx({
                    'text-red-500': t.type === 'EXPENSE',
                    'text-green-500': t.type === 'INCOME',
                })}
            >
                {getCategoryType(t.type)}
            </p>,
            account?.name || 'Не найдено',
            category?.name || 'Не найдено',
            t.amount.toLocaleString(),
            t.comment,
            <div className="flex gap-x-2">
                <button title="Редактировать" onClick={() => handleOpen(t)}>
                    <FaEdit className="text-blue-500" color="" size={30} />
                </button>
                <DeleteTransaction transactionId={t.id}></DeleteTransaction>
            </div>,
        ]
    }
    return (
        <>
            <div>
                <h3 className="text-xl font-semibold mb-4">Транзакции</h3>
                <Accordion
                    className="p-4 rounded-2xl shadow-my-soft bg-white"
                    renderTitle={(handleSwitch, icon) => (
                        <div
                            onClick={handleSwitch}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            <h4 className="font-semibold text-xl">
                                Транзакции
                            </h4>
                            {icon}
                        </div>
                    )}
                >
                    <div className="mt-4 rounded-2xl shadow-my-soft bg-white">
                        <MyTable
                            headers={headers}
                            renderRow={renderCurrenciesRow}
                            data={transactions}
                        />
                    </div>
                </Accordion>
            </div>
            <AnimatePresence>
                {transaction && (
                    <Portal>
                        <ModalOpacity onClick={handleClose}>
                            <div
                                className="w-fit mx-auto mt-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <TransactionForm
                                    transactionId={transaction.id}
                                    transactionType={transaction.type}
                                    transactionAccountId={transaction.accountId}
                                    transactionAmount={transaction.amount}
                                    transactionCategoryId={
                                        transaction.categoryId
                                    }
                                    transactionDate={transaction.date}
                                    transactionComment={transaction.comment}
                                    handleClose={handleClose}
                                />
                            </div>
                        </ModalOpacity>
                    </Portal>
                )}
            </AnimatePresence>
        </>
    )
}

export default TransactionsTable

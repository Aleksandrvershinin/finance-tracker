import { TTransaction } from '../types/transaction.types'
import { AnimatePresence } from 'framer-motion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import TransactionForm from './TransactionForm'
import { useState } from 'react'
import Accordion from '@/shared/components/Accordion'
import TransactionCard from './TransactionCard'
import useWindowSize from '@/shared/lib/useWindowSize'
import breakpoints from '@/shared/configs/mediaBreakpoints'
import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { FaEdit } from 'react-icons/fa'
import DeleteTransaction from './DeleteTransaction'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import clsx from 'clsx'
import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { useCategoriesStore } from '@/entities/category/lib/useCategoriesStore'

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
    const { width } = useWindowSize()
    const accounts = useAccountStore((state) => state.accounts)
    const categories = useCategoriesStore((state) => state.categories)
    const [transaction, setTransaction] = useState<TTransaction | null>(null)
    const handleClose = () => {
        setTransaction(null)
    }
    const handleOpen = (transaction: TTransaction) => {
        setTransaction(transaction)
    }
    const renderRow = (t: TTransaction) => {
        const account = accounts.find((acc) => acc.id === t.accountId)
        const category = categories.find((ct) => ct.id === t.categoryId)
        return [
            <p className="text-nowrap">{t.date.split('T')[0]}</p>,
            <p
                className={clsx(
                    {
                        'text-red-500': t.type === 'EXPENSE',
                        'text-green-500': t.type === 'INCOME',
                    },
                    'font-semibold',
                )}
            >
                {getCategoryType(t.type)}
            </p>,
            account?.name || 'Не найдено',
            category?.name || 'Не найдено',
            t.amount.toLocaleString(),
            <p className="break-all">{t.comment}</p>,
            <div className="flex gap-x-2">
                <button title="Редактировать" onClick={() => handleOpen(t)}>
                    <FaEdit className="text-blue-500" size={23} />
                </button>
                <DeleteTransaction transactionId={t.id}></DeleteTransaction>
            </div>,
        ]
    }
    return (
        <>
            <div>
                <Accordion
                    className="lg:p-4 lg:rounded-2xl lg:shadow-my-soft lg:bg-white"
                    renderTitle={(handleSwitch, icon) => (
                        <div
                            onClick={handleSwitch}
                            className="flex justify-between items-center cursor-pointer"
                        >
                            <h3 className="font-semibold text-xl">
                                Транзакции
                            </h3>
                            {icon}
                        </div>
                    )}
                >
                    {width < breakpoints.xl ? (
                        <div className="mt-4">
                            {transactions.map((t) => (
                                <div key={t.id}>
                                    <TransactionCard
                                        transaction={t}
                                        handleClickEdit={handleOpen}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-4 rounded-2xl shadow-my-soft bg-white">
                            <MyTable
                                headers={headers}
                                renderRow={renderRow}
                                data={transactions}
                            />
                        </div>
                    )}
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

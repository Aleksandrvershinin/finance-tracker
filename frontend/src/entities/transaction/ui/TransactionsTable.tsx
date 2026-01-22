import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Accordion from '@/shared/components/Accordion'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import TransactionForm from './TransactionForm'
import TransactionCard from './TransactionCard'
import useWindowSize from '@/shared/lib/useWindowSize'
import breakpoints from '@/shared/configs/mediaBreakpoints'
import { FaEdit } from 'react-icons/fa'
import DeleteTransaction from './DeleteTransaction'
import clsx from 'clsx'
import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useCategoryList } from '@/entities/category/lib/useCategoryList'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { useMyTable } from '@/shared/lib/hooks/useMyTable'
import { TTransaction } from '../types/transaction.types'
import { ColumnDef } from '@tanstack/react-table'
import MyTableUI from '@/shared/components/ui/MyTableUI/MyTableUI'

interface Props {
    transactions: TTransaction[]
}

const TransactionsTable: React.FC<Props> = ({ transactions }) => {
    const { width } = useWindowSize()
    const { data: accounts = [] } = useAccountList()
    const { data: categories = [] } = useCategoryList()

    const [selectedTransaction, setSelectedTransaction] =
        useState<TTransaction | null>(null)

    const accountsMap = useMemo(
        () => Object.fromEntries(accounts.map((acc) => [acc.id, acc])),
        [accounts],
    )
    const categoriesMap = useMemo(
        () => Object.fromEntries(categories.map((cat) => [cat.id, cat])),
        [categories],
    )

    const handleOpen = (transaction: TTransaction) =>
        setSelectedTransaction(transaction)
    const handleClose = () => setSelectedTransaction(null)

    const columns: ColumnDef<TTransaction>[] = [
        {
            accessorKey: 'date',
            header: 'Дата',
            cell: (info) => (info.getValue() as string).split('T')[0],
        },
        {
            accessorKey: 'type',
            header: 'Тип',
            cell: ({ row }) => {
                const t = row.original
                return (
                    <p
                        className={clsx(
                            'font-semibold',
                            t.type === 'EXPENSE'
                                ? 'text-red-500'
                                : 'text-green-500',
                        )}
                    >
                        {getCategoryType(t.type)}
                    </p>
                )
            },
        },
        {
            accessorKey: 'accountId',
            header: 'Счет',
            cell: ({ row }) =>
                accountsMap[row.original.accountId]?.name ?? 'Не найдено',
        },
        {
            accessorKey: 'categoryId',
            header: 'Категория',
            cell: ({ row }) =>
                categoriesMap[row.original.categoryId]?.name ?? 'Не найдено',
        },
        {
            accessorKey: 'amount',
            header: 'Сумма',
            cell: (info) => info.getValue()?.toLocaleString(),
        },
        {
            accessorKey: 'comment',
            header: 'Комментарий',
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Действия',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex gap-x-2">
                    <button
                        title="Редактировать"
                        onClick={() => handleOpen(row.original)}
                    >
                        <FaEdit className="text-blue-500" size={23} />
                    </button>
                    <DeleteTransaction transactionId={row.original.id} />
                </div>
            ),
        },
    ]

    const table = useMyTable(transactions, columns)

    return (
        <>
            <Accordion
                className="lg:p-4 lg:rounded-2xl lg:shadow-my-soft lg:bg-white"
                renderTitle={(handleSwitch, icon) => (
                    <div
                        onClick={handleSwitch}
                        className="flex justify-between items-center cursor-pointer"
                    >
                        <h3 className="font-semibold text-xl">Транзакции</h3>
                        {icon}
                    </div>
                )}
            >
                {width < breakpoints.xl ? (
                    <div className="mt-4">
                        {transactions.map((t) => (
                            <TransactionCard
                                key={t.id}
                                transaction={t}
                                handleClickEdit={handleOpen}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 rounded-2xl shadow-my-soft bg-white">
                        <MyTableUI table={table} />
                    </div>
                )}
            </Accordion>

            <AnimatePresence>
                {selectedTransaction && (
                    <Portal>
                        <ModalOpacity onClick={handleClose}>
                            <div
                                className="w-fit mx-auto mt-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <TransactionForm
                                    transactionId={selectedTransaction.id}
                                    transactionType={selectedTransaction.type}
                                    transactionAccountId={
                                        selectedTransaction.accountId
                                    }
                                    transactionAmount={
                                        selectedTransaction.amount
                                    }
                                    transactionCategoryId={
                                        selectedTransaction.categoryId
                                    }
                                    transactionDate={selectedTransaction.date}
                                    transactionComment={
                                        selectedTransaction.comment
                                    }
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

import ArrowIcon from '@/shared/components/ui/icons/ArrowIcon'
import { TTransaction } from '../types/transaction.types'
import clsx from 'clsx'
import { FaEdit } from 'react-icons/fa'
import DeleteTransaction from './DeleteTransaction'
import { options } from '@/shared/configs/optionsDate'
import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useCategoryList } from '@/entities/category/lib/useCategoryList'

interface Props {
    transaction: TTransaction
    handleClickEdit: (transaction: TTransaction) => void
}

function TransactionCard({ transaction, handleClickEdit }: Props) {
    const accounts = useAccountList().data || []
    const account = accounts.find((acc) => acc.id === transaction.accountId)
    const { data: categories = [] } = useCategoryList()
    const category = categories.find((ct) => ct.id === transaction.categoryId)
    const currentDate = new Date(transaction.date)
    const formattedDate = currentDate.toLocaleDateString('ru-RU', options)

    return (
        <>
            <div className="bg-gray-100 p-2">{formattedDate}</div>
            <div className="flex px-2 py-4 items-center gap-4">
                <div
                    className={clsx(
                        {
                            'bg-red-500': transaction.type === 'EXPENSE',
                            'bg-green-500': transaction.type === 'INCOME',
                        },
                        'rounded-full text-white flex justify-center items-center w-8 h-8',
                    )}
                >
                    {transaction.type === 'INCOME' && (
                        <ArrowIcon direction="down" size={20} />
                    )}
                    {transaction.type === 'EXPENSE' && (
                        <ArrowIcon direction="up" size={20} />
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <p className="text-gray-500 break-all font-semibold text-lg">
                        {account?.name}
                    </p>
                    <p className="break-all font-medium">{category?.name}</p>
                    <p className="break-all text-sm text-gray-700">
                        {transaction.comment}
                    </p>
                </div>
                <div className="space-y-2">
                    <p
                        className={clsx(
                            {
                                'text-red-500': transaction.type === 'EXPENSE',
                                'text-green-500': transaction.type === 'INCOME',
                            },
                            'text-right',
                        )}
                    >
                        {transaction.type === 'EXPENSE' && '-'}{' '}
                        {transaction.type === 'INCOME' && '+'}{' '}
                        {transaction.amount}
                    </p>
                    <div className="flex gap-x-2">
                        <button
                            title="Редактировать"
                            onClick={() => handleClickEdit(transaction)}
                        >
                            <FaEdit
                                className="text-blue-500"
                                color=""
                                size={20}
                            />
                        </button>
                        <DeleteTransaction
                            transactionId={transaction.id}
                        ></DeleteTransaction>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionCard

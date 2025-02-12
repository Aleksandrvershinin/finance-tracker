import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { TTransfer } from '../types/transfer.types'
import MyTable from '@/shared/components/ui/MyTable/MyTable'

const headers = ['Дата', 'Откуда', 'Куда', 'Сумма', 'Коментарий', 'Действия']

interface Props {
    transfers: TTransfer[]
}

function TrasfersTable({ transfers }: Props) {
    const accounts = useAccountStore((state) => state.accounts)
    const renderRow = (t: TTransfer) => {
        const fromAccount = accounts.find((acc) => acc.id === t.fromAccountId)
        const toAccount = accounts.find((acc) => acc.id === t.toAccountId)
        return [
            t.date.split('T')[0],
            fromAccount?.name || 'Не найдено',
            toAccount?.name || 'Не найдено',
            t.amount.toLocaleString(),
            t.comment,
            <div className="flex gap-x-2">
                {/* <DeleteTransaction transactionId={t.id}></DeleteTransaction> */}
            </div>,
        ]
    }
    return (
        <>
            <div>
                <h3 className="text-xl font-semibold mb-4">Переводы</h3>
                <div className="p-4 rounded-2xl shadow-my-soft bg-white">
                    <MyTable
                        headers={headers}
                        renderRow={renderRow}
                        data={transfers}
                    />
                </div>
            </div>
        </>
    )
}

export default TrasfersTable

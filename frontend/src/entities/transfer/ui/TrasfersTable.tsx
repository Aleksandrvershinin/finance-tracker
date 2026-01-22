import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { TTransfer } from '../types/transfer.types'
import Accordion from '@/shared/components/Accordion'
import TransferDelete from './TransferDelete'
import TransferCard from './TransferCard'

import breakpoints from '@/shared/configs/mediaBreakpoints'
import useWindowSize from '@/shared/lib/useWindowSize'
import { useAccountList } from '@/entities/account/lib/useAccountList'

import { useMyTable } from '@/shared/lib/hooks/useMyTable'
import MyTableUI from '@/shared/components/ui/MyTableUI/MyTableUI'

interface Props {
    transfers: TTransfer[]
}

function TransfersTable({ transfers }: Props) {
    const { width } = useWindowSize()
    const { data: accounts = [] } = useAccountList()

    const accountsMap = useMemo(() => {
        return Object.fromEntries(accounts.map((acc) => [acc.id, acc]))
    }, [accounts])

    const columns: ColumnDef<TTransfer>[] = [
        {
            accessorKey: 'date',
            header: 'Дата',
            cell: (info) => (info.getValue() as string).split('T')[0],
        },
        {
            accessorKey: 'fromAccountId',
            header: 'Откуда',
            cell: ({ row }) =>
                accountsMap[row.original.fromAccountId]?.name ?? '—',
        },
        {
            accessorKey: 'toAccountId',
            header: 'Куда',
            cell: ({ row }) =>
                accountsMap[row.original.toAccountId]?.name ?? '—',
        },
        {
            accessorKey: 'amount',
            header: 'Сумма',
            cell: (info) => info.getValue()?.toLocaleString(),
        },
        {
            accessorKey: 'comment',
            header: 'Комментарий',
            enableSorting: false,
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Действия',
            enableSorting: false,
            cell: ({ row }) => <TransferDelete transferId={row.original.id} />,
        },
    ]

    const table = useMyTable(transfers, columns)

    return (
        <Accordion
            className="lg:p-4 lg:rounded-2xl lg:shadow-my-soft lg:bg-white"
            renderTitle={(handleSwitch, icon) => (
                <div
                    onClick={handleSwitch}
                    className="flex justify-between items-center cursor-pointer"
                >
                    <h3 className="text-xl font-semibold">Переводы</h3>
                    {icon}
                </div>
            )}
        >
            {width < breakpoints.xl ? (
                <div className="mt-4">
                    {transfers.map((t) => (
                        <TransferCard key={t.id} transfer={t} />
                    ))}
                </div>
            ) : (
                <div className="mt-4 rounded-2xl shadow-my-soft bg-white">
                    <MyTableUI table={table} />
                </div>
            )}
        </Accordion>
    )
}

export default TransfersTable

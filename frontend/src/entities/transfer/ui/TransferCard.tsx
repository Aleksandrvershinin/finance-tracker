import { options } from '@/shared/configs/optionsDate'
import { TTransfer } from '../types/transfer.types'
import ArrowIcon from '@/shared/components/ui/icons/ArrowIcon'
import TransferDelete from './TransferDelete'
import { useAccountList } from '@/entities/account/lib/useAccountList'

interface Props {
    transfer: TTransfer
}

function TransferCard({ transfer }: Props) {
    const accounts = useAccountList().data || []
    const accountFrom = accounts.find(
        (acc) => acc.id === transfer.fromAccountId,
    )
    const accountTo = accounts.find((acc) => acc.id === transfer.toAccountId)
    const currentDate = new Date(transfer.date)
    const formattedDate = currentDate.toLocaleDateString('ru-RU', options)
    return (
        <>
            <div className="bg-gray-100 p-2">{formattedDate}</div>
            <div className="flex px-2 py-4 items-center gap-4">
                <div className="bg-[--soft-purple] rounded-full text-white flex justify-center items-center w-8 h-8">
                    <ArrowIcon direction="right" size={20} />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="font-semibold text-sm flex flex-wrap items-center gap-x-2">
                        <p className="text-red-500">{accountFrom?.name}</p>
                        <div>
                            <ArrowIcon direction="right" size={20} />
                        </div>
                        <p className="text-green-500">{accountTo?.name}</p>
                    </div>
                    <p className="break-all text-sm text-gray-700">
                        {transfer.comment}
                    </p>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold text-right">
                        {transfer.amount.toLocaleString()}
                    </p>
                    <div className="text-right">
                        <TransferDelete transferId={transfer.id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransferCard

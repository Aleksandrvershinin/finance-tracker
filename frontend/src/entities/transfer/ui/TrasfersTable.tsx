import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { TTransfer } from '../types/transfer.types'
import MyTable from '@/shared/components/ui/MyTable/MyTable'
import Accordion from '@/shared/components/Accordion'
import TransferDelete from './TransferDelete'
import breakpoints from '@/shared/configs/mediaBreakpoints'
import TransferCard from './TransferCard'
import useWindowSize from '@/shared/lib/useWindowSize'

const headers = ['Дата', 'Откуда', 'Куда', 'Сумма', 'Коментарий', 'Действия']

interface Props {
    transfers: TTransfer[]
}

function TrasfersTable({ transfers }: Props) {
    const { width } = useWindowSize()
    const accounts = useAccountStore((state) => state.accounts)
    const renderRow = (t: TTransfer) => {
        const fromAccount = accounts.find((acc) => acc.id === t.fromAccountId)
        const toAccount = accounts.find((acc) => acc.id === t.toAccountId)
        return [
            <p className="text-nowrap">{t.date.split('T')[0]}</p>,
            fromAccount?.name || 'Не найдено',
            toAccount?.name || 'Не найдено',
            t.amount.toLocaleString(),
            t.comment,
            <div className="flex gap-x-2">
                {<TransferDelete transferId={t.id} />}
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
                            <h3 className="text-xl font-semibold">Переводы</h3>
                            {icon}
                        </div>
                    )}
                >
                    {width < breakpoints.xl ? (
                        <div className="mt-4">
                            {transfers.map((t) => (
                                <div key={t.id}>
                                    <TransferCard transfer={t} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-4 rounded-2xl shadow-my-soft bg-white">
                            <MyTable
                                headers={headers}
                                renderRow={renderRow}
                                data={transfers}
                            />
                        </div>
                    )}
                </Accordion>
            </div>
        </>
    )
}

export default TrasfersTable

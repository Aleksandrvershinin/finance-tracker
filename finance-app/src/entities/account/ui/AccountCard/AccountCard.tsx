import { TCurrency } from '@/entities/currency/types/currency.types'
import { TAccount } from '../../types/account.types'

interface AccountCardProps {
    name: TAccount['name']
    balance: TAccount['balance']
    currency: TCurrency['code']
    symbol: TCurrency['symbol']
}

const AccountCard: React.FC<AccountCardProps> = ({
    name,
    balance,
    currency,
    symbol,
}) => {
    return (
        <div className="p-4 rounded-2xl shadow-my-soft bg-white flex flex-col gap-2 w-72">
            <div className="flex items-center justify-between gap-x-10">
                <h2 className="text-lg font-semibold text-gray-700 overflow-hidden text-ellipsis line-clamp-2">
                    {name}
                </h2>
                <div className="bg-gray-200 text-gray-700 font-medium px-3 py-1 rounded-full">
                    {symbol}
                </div>
            </div>
            <div className="flex justify-between items-center gap-x-10">
                <span className="text-2xl font-bold text-gray-900">
                    {balance.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">{currency}</span>
            </div>
        </div>
    )
}

export default AccountCard

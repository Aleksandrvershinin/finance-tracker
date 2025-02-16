import { TAccount } from '../../types/account.types'
import ExpenseBtn from '../btns/ExpenseBtn'
import IncomeBtn from '../btns/IncomeBtn'
import TransferBtn from '../btns/TransferBtn'
import EditBtn from '../btns/EditBtn'

interface AccountCardProps {
    account: TAccount
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
    return (
        <div className="p-4 rounded-2xl shadow-my-soft bg-white flex flex-col gap-2 min-w-[300px]">
            <div className="flex items-center justify-between gap-x-10">
                <h2
                    title="Название счета"
                    className="text-lg font-semibold text-gray-700 overflow-hidden text-ellipsis line-clamp-2"
                >
                    {account.name}
                </h2>
                <div className="bg-gray-200 text-gray-700 font-medium px-3 py-1 rounded-full">
                    {account.currency.symbol}
                </div>
            </div>
            <div className="flex justify-between items-center gap-x-10">
                <span className="text-2xl font-bold text-gray-900">
                    {account.balance.toLocaleString()}
                </span>
                <span className="text-sm font-semibold">
                    {account.currency.code}
                </span>
            </div>
            <div className="flex gap-x-2 items-center">
                <IncomeBtn accountId={account.id}></IncomeBtn>
                <ExpenseBtn accountId={account.id}></ExpenseBtn>
                <TransferBtn accountId={account.id}></TransferBtn>
                <EditBtn account={account}></EditBtn>
            </div>
        </div>
    )
}

export default AccountCard

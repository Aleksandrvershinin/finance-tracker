import { AccountFilterItem } from './AccountFilterItem'
import { AccountGroupFilterItem } from './AccountGroupFilterItem'
import { ExpenseTransactionFilterItem } from './ExpenseTransactionFilterItem'
import { IncomeTransactionFilterItem } from './IncomeTransactionFilterItem'
import { MonthFilterItem } from './MonthFilterItem'
import { TypeTransactionFilterItem } from './TypeTransactionFilterItem'

type Props = {
    isShowTransactionFilters?: boolean
}

export const FilterPanel = ({ isShowTransactionFilters }: Props) => {
    return (
        <div className="mb-5 p-4 space-y-4 rounded-2xl shadow-my-soft">
            <h2 className="text-2xl font-bold">Фильтр</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 max-w-[400px]">
                    <AccountGroupFilterItem />
                </div>
                <div className="flex-1 max-w-[400px]">
                    <AccountFilterItem />
                </div>
                <div className="flex-1 max-w-[400px]">
                    <MonthFilterItem />
                </div>
            </div>
            {isShowTransactionFilters && (
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 max-w-[400px]">
                        <TypeTransactionFilterItem />
                    </div>
                    <div className="flex-1 max-w-[400px]">
                        <ExpenseTransactionFilterItem />
                    </div>
                    <div className="flex-1 max-w-[400px]">
                        <IncomeTransactionFilterItem />
                    </div>
                </div>
            )}
        </div>
    )
}

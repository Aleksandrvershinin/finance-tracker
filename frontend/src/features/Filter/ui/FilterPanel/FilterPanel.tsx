import { AccountFilterItem } from './AccountFilterItem'
import { AccountGroupFilterItem } from './AccountGroupFilterItem'
import { AccountTagFilterItem } from './AccountTagFilterItem'
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

            {/* Основные фильтры */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div>
                    <AccountTagFilterItem />
                </div>
                <div>
                    <AccountGroupFilterItem />
                </div>
                <div>
                    <AccountFilterItem />
                </div>
                <div>
                    <MonthFilterItem />
                </div>
            </div>

            {/* Фильтры транзакций */}
            {isShowTransactionFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div>
                        <TypeTransactionFilterItem />
                    </div>
                    <div>
                        <ExpenseTransactionFilterItem />
                    </div>
                    <div>
                        <IncomeTransactionFilterItem />
                    </div>
                </div>
            )}
        </div>
    )
}

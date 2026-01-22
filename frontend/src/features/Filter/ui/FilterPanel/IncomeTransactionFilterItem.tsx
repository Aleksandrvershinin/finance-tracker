import { useFilterStore } from '../../lib/useFilterStore'
import Select, { MultiValue } from 'react-select'
import { useMemo } from 'react'
import { useCategoryList } from '@/entities/category/lib/useCategoryList'
type Option = { value: number; label: string }

export const IncomeTransactionFilterItem = () => {
    const selectedIncomeTransactionIds =
        useFilterStore().selectedIncomeTransactionIds
    const setIncomeTransactionIds = useFilterStore().setIncomeTransactionIds
    const { data: categories = [] } = useCategoryList()
    const options: Option[] = useMemo(
        () =>
            categories
                .filter((cat) => cat.type === 'INCOME')
                .map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                })),
        [categories],
    )
    const handleChange = (options: MultiValue<Option>) => {
        const ids = options.map((o) => o.value)
        setIncomeTransactionIds(ids)
    }
    return (
        <>
            <label className="block mb-2 font-medium">
                Выберите категорию дохода
            </label>
            <Select
                isMulti
                options={options}
                value={options.filter((opt) =>
                    selectedIncomeTransactionIds.includes(opt.value),
                )}
                onChange={handleChange}
                placeholder="Выберите счета"
                className="min-w-[240px] text-sm"
            />
        </>
    )
}

import Select, { SingleValue } from 'react-select'
import { useFilterStore } from '../../lib/useFilterStore'
import { TCategory } from '@/entities/category/types/category.types'
import { getCategoryType } from '@/shared/lib/getCategoryType'

type Option = {
    value: TCategory['type']
    label: string
}

const options: Option[] = [
    { label: getCategoryType('INCOME'), value: 'INCOME' },
    { label: getCategoryType('EXPENSE'), value: 'EXPENSE' },
]

export const TypeTransactionFilterItem = () => {
    const selectedTypeTransaction = useFilterStore(
        (state) => state.selectedTypeTransaction,
    )
    const setTypeTransaction = useFilterStore(
        (state) => state.setTypeTransaction,
    )

    const handleChange = (option: SingleValue<Option>) => {
        setTypeTransaction(option?.value ?? null)
    }

    return (
        <>
            <label className="block mb-2 font-medium">Тип категории</label>

            <Select<Option>
                options={options}
                value={
                    options.find((o) => o.value === selectedTypeTransaction) ??
                    null
                }
                onChange={handleChange}
                isClearable
                placeholder="Выберите тип"
                className="min-w-[240px] text-sm"
            />
        </>
    )
}

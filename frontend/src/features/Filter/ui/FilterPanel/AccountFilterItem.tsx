import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useFilterStore } from '../../lib/useFilterStore'
import Select, { MultiValue } from 'react-select'
import { useMemo } from 'react'
type Option = { value: number; label: string }

export const AccountFilterItem = () => {
    const selectedAccountIds = useFilterStore().selectedAccountIds
    const setAccountIds = useFilterStore().setAccountIds
    const { data: accounts = [] } = useAccountList()
    const options: Option[] = useMemo(
        () =>
            accounts.map((a) => ({
                value: a.id,
                label: a.name,
            })),
        [accounts],
    )
    const handleChange = (options: MultiValue<Option>) => {
        const ids = options.map((o) => o.value)
        setAccountIds(ids)
    }
    return (
        <>
            <label className="block mb-2 font-medium">Выберите счета:</label>
            <Select
                isMulti
                options={options}
                value={options.filter((opt) =>
                    selectedAccountIds.includes(opt.value),
                )}
                onChange={handleChange}
                placeholder="Выберите счета"
                className="min-w-[240px] text-sm"
            />
        </>
    )
}

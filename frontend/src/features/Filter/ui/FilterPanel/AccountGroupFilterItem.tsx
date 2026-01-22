import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useFilterStore } from '../../lib/useFilterStore'
import Select, { MultiValue } from 'react-select'
import { useMemo } from 'react'
type Option = { value: number; label: string }

export const AccountGroupFilterItem = () => {
    const selectedGroupIds = useFilterStore().selectedGroupIds
    const setGroupAccountIds = useFilterStore().setGroupAccountIds
    const { data: accounts = [] } = useAccountList()
    const options: Option[] = useMemo(() => {
        const groupMap = new Map<number, string>()
        accounts.forEach((a) => {
            if (a.groupAccount) {
                groupMap.set(a.groupAccount.id, a.groupAccount.name)
            }
        })
        return Array.from(groupMap.entries()).map(([id, label]) => ({
            value: id,
            label,
        }))
    }, [accounts])
    const handleChange = (options: MultiValue<Option>) => {
        const ids = options.map((o) => o.value)
        setGroupAccountIds(ids)
    }
    return (
        <>
            <label className="block mb-2 font-medium">
                Выберите группы счетов:
            </label>
            <Select
                isMulti
                options={options}
                value={options.filter((opt) =>
                    selectedGroupIds.includes(opt.value),
                )}
                onChange={handleChange}
                placeholder="Выберите группы счетов"
                className="min-w-[240px] text-sm"
            />
        </>
    )
}

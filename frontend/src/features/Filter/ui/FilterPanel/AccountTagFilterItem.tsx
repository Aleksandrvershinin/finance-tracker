import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useFilterStore } from '../../lib/useFilterStore'
import Select, { MultiValue } from 'react-select'
import { useMemo } from 'react'
type Option = { value: number; label: string }

export const AccountTagFilterItem = () => {
    const selectedTagIds = useFilterStore((s) => s.selectedTagIds)
    const setTagAccountIds = useFilterStore((s) => s.setTagAccountIds)
    const { data: accounts = [] } = useAccountList()
    const options: Option[] = useMemo(() => {
        const tagMap = new Map<number, string>()
        accounts.forEach((a) => {
            if (a.accountTag) {
                tagMap.set(a.accountTag.id, a.accountTag.name)
            }
        })

        return Array.from(tagMap.entries()).map(([id, label]) => ({
            value: id,
            label,
        }))
    }, [accounts])
    const handleChange = (options: MultiValue<Option>) => {
        const ids = options.map((o) => o.value)
        setTagAccountIds(ids)
    }
    return (
        <>
            <label className="block mb-2 font-medium">
                Выберите тэги для счетов:
            </label>
            <Select
                isMulti
                options={options}
                value={options.filter((opt) =>
                    selectedTagIds.includes(opt.value),
                )}
                onChange={handleChange}
                placeholder="Выберите тэги для счетов"
                className="min-w-[240px] text-sm"
            />
        </>
    )
}

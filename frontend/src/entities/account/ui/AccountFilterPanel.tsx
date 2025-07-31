import Select, { MultiValue } from 'react-select'
import { useMemo } from 'react'
import { useAccountStore } from '../lib/useAccountStore'

type Option = { value: number; label: string }

// Создаем массив из 20 месяцев: 2 вперёд + текущий + 17 предыдущих
const months = Array.from({ length: 20 }, (_, index) => {
    // Вычисляем сдвиг: начинаем с -2 (будущее) и идем до 17 (прошлое)
    const offset = -2 + index

    // Создаем объект текущей даты
    const currentDate = new Date()

    // Устанавливаем день на 1 (чтобы избежать ошибок перехода между месяцами)
    currentDate.setDate(1)

    // Сдвигаем месяц на рассчитанное значение offset
    currentDate.setMonth(currentDate.getMonth() - offset)

    // Возвращаем объект с двумя свойствами:
    return {
        // Значение в формате "YYYY-MM" (например, "2025-07")
        value: currentDate.toISOString().slice(0, 7),

        // Метка в читаемом формате, например, "July 2025"
        label: `${currentDate.toLocaleString('default', {
            month: 'long',
        })} ${currentDate.getFullYear()}`,
    }
})
export function AccountFilterPanel() {
    const {
        accounts,
        selectedAccountIds,
        selectedTagIds,
        selectedMonths,
        setSelectedMonths,
        filterAccounts,
    } = useAccountStore()

    const accountOptions: Option[] = useMemo(
        () =>
            accounts.map((a) => ({
                value: a.id,
                label: a.name,
            })),
        [accounts],
    )

    const tagOptions: Option[] = useMemo(() => {
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

    const handleAccountChange = (options: MultiValue<Option>) => {
        const ids = options.map((o) => o.value)
        filterAccounts(ids, selectedTagIds)
    }

    const handleTagChange = (options: MultiValue<Option>) => {
        const ids = options.map((o) => o.value)
        filterAccounts(selectedAccountIds, ids)
    }

    return (
        <div className="mb-5 p-4 space-y-4 rounded-2xl shadow-my-soft">
            <h2 className="text-2xl font-bold">Фильтр</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 max-w-[400px]">
                    <label className="block mb-2 font-medium">
                        Выберите счета:
                    </label>
                    <Select
                        isMulti
                        options={accountOptions}
                        value={accountOptions.filter((opt) =>
                            selectedAccountIds.includes(opt.value),
                        )}
                        onChange={handleAccountChange}
                        placeholder="Выберите счета"
                        className="min-w-[240px] text-sm"
                    />
                </div>
                <div className="flex-1 max-w-[400px]">
                    <label className="block mb-2 font-medium">
                        Выберите теги к счетам:
                    </label>
                    <Select
                        isMulti
                        options={tagOptions}
                        value={tagOptions.filter((opt) =>
                            selectedTagIds.includes(opt.value),
                        )}
                        onChange={handleTagChange}
                        placeholder="Выберите теги к счетам"
                        className="min-w-[240px] text-sm"
                    />
                </div>
                <div className="flex-1 max-w-[400px]">
                    <label className="block mb-2 font-medium">
                        Выберите месяц:
                    </label>
                    <Select
                        isMulti
                        isClearable
                        options={months}
                        value={months.filter((month) =>
                            selectedMonths.includes(month.value),
                        )}
                        onChange={(selectedOption) =>
                            setSelectedMonths(
                                selectedOption
                                    ? selectedOption.map((o) => o.value)
                                    : [],
                            )
                        }
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                    />
                </div>
            </div>
        </div>
    )
}

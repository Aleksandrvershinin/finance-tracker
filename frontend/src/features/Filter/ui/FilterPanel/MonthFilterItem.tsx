import Select from 'react-select'
import { useFilterStore } from '../../lib/useFilterStore'

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

export const MonthFilterItem = () => {
    const selectedMonths = useFilterStore().selectedMonths
    const setMonths = useFilterStore().setMonths
    return (
        <>
            <label className="block mb-2 font-medium">Выберите месяц:</label>
            <Select
                isMulti
                isClearable
                options={months}
                value={months.filter((month) =>
                    selectedMonths.includes(month.value),
                )}
                onChange={(selectedOption) =>
                    setMonths(
                        selectedOption
                            ? selectedOption.map((o) => o.value)
                            : [],
                    )
                }
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
            />
        </>
    )
}

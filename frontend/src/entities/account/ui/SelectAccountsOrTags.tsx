import Select from 'react-select'

interface Props {
    options: {
        value: number
        label: string
    }[]
    selectedOptions: {
        value: number
        label: string
    }[]
    setSelectedOptions: (
        opts: {
            value: number
            label: string
        }[],
    ) => void
    tags?: boolean
}

function SelectAccountsOrTags({
    options,
    selectedOptions,
    setSelectedOptions,
    tags,
}: Props) {
    return (
        <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={(newValue) =>
                setSelectedOptions(
                    newValue as { value: number; label: string }[],
                )
            }
            placeholder={tags ? 'Фильтр по тегам' : 'Фильтр по счетам'}
            className="w-full text-sm"
            styles={{
                control: (base, state) => ({
                    ...base,
                    backgroundColor: '#d1fae5', // bg-green-100
                    borderColor: state.isFocused ? '#34d399' : '#a7f3d0', // focus:ring-green-400
                    boxShadow: state.isFocused ? '0 0 0 1px #34d399' : 'none',
                    borderRadius: '1rem', // rounded-2xl
                    padding: '0.25rem 0.5rem',
                    minHeight: '40px',
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#86efac', // slightly darker green
                    borderRadius: '0.5rem',
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: '#065f46', // darker text
                    fontWeight: '500',
                }),
                multiValueRemove: (base) => ({
                    ...base,
                    color: '#047857',
                    ':hover': {
                        backgroundColor: '#34d399',
                        color: 'white',
                    },
                }),
                placeholder: (base) => ({
                    ...base,
                    color: '#065f46',
                    fontWeight: '500',
                }),
                menu: (base) => ({
                    ...base,
                    borderRadius: '1rem',
                    padding: '0.5rem',
                    zIndex: 20,
                }),
            }}
        />
    )
}

export default SelectAccountsOrTags

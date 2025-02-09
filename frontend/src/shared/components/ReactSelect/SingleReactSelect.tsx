import Select from 'react-select'

interface Option {
    value: string | number
    label: string
}

interface Props {
    value: Option | null
    options: Option[]
    handleChange: (selectedOption: Option | null) => void
    placeholder?: string
    isClearable?: boolean
    isSearchable?: boolean
}

function SingleReactSelect({
    value,
    options,
    handleChange,
    placeholder = 'Выберете',
    isClearable = false,
    isSearchable = true,
}: Props) {
    return (
        <Select
            value={value}
            options={options}
            onChange={handleChange}
            placeholder={placeholder}
            isClearable={isClearable}
            isSearchable={isSearchable}
        />
    )
}

export default SingleReactSelect

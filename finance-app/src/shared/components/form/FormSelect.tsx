import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
} from 'react-hook-form'
import Select, { SingleValue } from 'react-select'

interface Option {
    value: string | number
    label: string
}

interface Props<T extends FieldValues> {
    options: Option[]
    control: Control<T>
    error?: FieldError
    name: Path<T>
    label?: string
    placeholder?: string
    id?: string
    isClearable?: boolean
}

function FormSelect<T extends FieldValues>(props: Props<T>) {
    const {
        options,
        error,
        control,
        name,
        id,
        label,
        placeholder,
        isClearable,
    } = props
    return (
        <div className="flex flex-col gap-y-2">
            {label && <label {...(id && { htmlFor: id })}>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={options}
                        value={
                            options.find(
                                (option) => option.value === field.value,
                            ) || null
                        }
                        onChange={(selectedOption: SingleValue<Option>) => {
                            field.onChange(selectedOption?.value || null)
                        }}
                        isClearable={isClearable}
                        {...(id && { id })}
                        {...(placeholder && { placeholder })}
                    />
                )}
            />
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    )
}

export default FormSelect

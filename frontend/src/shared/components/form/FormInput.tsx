/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FieldValues, Path, FieldError, Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import MyInput from '../ui/inputs/MyInput/MyInput'

interface PropsFormItem<T extends FieldValues> {
    control: Control<T>
    error?: FieldError
    name: Path<T>
    label?: string
    placeholder?: string
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    id?: string
    toLocaleStr?: boolean
    removeZero?: boolean
    readOnly?: boolean
}

function FormIput<T extends FieldValues>(props: PropsFormItem<T>) {
    const {
        error,
        control,
        name,
        id,
        label,
        placeholder,
        type = 'text',
        toLocaleStr = false,
        removeZero = false,
        readOnly,
    } = props

    return (
        <div className="flex flex-col gap-y-2">
            {label && <label {...(id && { htmlFor: id })}>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    let displayValue = field.value

                    // Если поле нуждается в форматировании, показываем toLocaleString
                    if (toLocaleStr) {
                        const numValue = Number(displayValue) // Преобразуем в число
                        if (!isNaN(numValue)) {
                            // @ts-ignore
                            displayValue = numValue.toLocaleString()
                        }
                    }

                    return (
                        <MyInput
                            {...field}
                            readOnly={readOnly}
                            type={type}
                            myColor={error ? 'error' : 'primary'}
                            {...(placeholder && { placeholder })}
                            {...(id && { id })}
                            value={displayValue}
                            onChange={(e) => {
                                let value = e.target.value

                                if (removeZero) {
                                    value = value.replace(/^0+(\d)/, '$1') // Убираем ведущие нули
                                }
                                if (toLocaleStr) {
                                    value = value.replace(/\s/g, '') // Убираем пробелы
                                    const numValue = Number(value) // Преобразуем в число
                                    if (!isNaN(numValue)) {
                                        // @ts-ignore
                                        value = numValue
                                    }
                                }
                                field.onChange(value)
                            }}
                        />
                    )
                }}
            />
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    )
}

export default FormIput

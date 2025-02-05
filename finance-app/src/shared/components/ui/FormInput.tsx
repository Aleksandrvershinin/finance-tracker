import type { FieldValues, Path, FieldError, Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import MyInput from './inputs/MyInput/MyInput'

interface PropsFormItem<T extends FieldValues> {
    control: Control<T>
    error?: FieldError
    name: Path<T>
    label?: string
    placeholder?: string
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    id?: string
}

function FormItem<T extends FieldValues>(props: PropsFormItem<T>) {
    const {
        error,
        control,
        name,
        id,
        label,
        placeholder,
        type = 'text',
    } = props

    return (
        <div className="flex flex-col gap-y-2">
            {label && <label {...(id && { htmlFor: id })}>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <MyInput
                        type={type}
                        myColor={error ? 'error' : 'primary'}
                        {...(placeholder && { placeholder })}
                        {...field}
                    />
                )}
            />
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    )
}

export default FormItem

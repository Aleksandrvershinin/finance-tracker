import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
} from 'react-hook-form'

interface ColorSelectProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    error?: FieldError
}

export function ColorPickerForm<T extends FieldValues>({
    control,
    error,
    name,
    label,
}: ColorSelectProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">{label}</label>
                    <div className="flex items-center gap-2">
                        {/* Нативный color input */}
                        <input
                            type="color"
                            {...field}
                            className="w-10 h-10 border rounded cursor-pointer p-0"
                        />

                        {/* HEX input рядом */}
                        <input
                            type="text"
                            value={field.value || '#000000'}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="border rounded px-2 py-1 w-24"
                        />
                    </div>

                    {/* Ошибка */}
                    {error && (
                        <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                </div>
            )}
        />
    )
}

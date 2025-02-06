import { currencySchema } from '@/entities/currency/types/currency.types'
import { z } from 'zod'

export const accountSchema = z.object({
    id: z.number(),
    balance: z.number(),
    name: z.string(),
    currency: currencySchema,
})

export const accountFormSchema = z.object({
    name: z.string().nonempty({ message: 'Название обязательно' }),
    balance: z
        .number()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Должно быть числом',
        }),
    currencyId: z
        .number({ message: 'Обязательное поле' })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Выберете валюту',
        }),
})

export type TAccount = z.infer<typeof accountSchema>
export type TAccountForm = z.infer<typeof accountFormSchema>

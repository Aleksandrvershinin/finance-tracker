import { z } from 'zod'

export const tagAccountSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
    order: z.number(),
})

export const tagAccountFormSchema = z.object({
    name: z
        .string({ message: 'Название обязательно' })
        .nonempty({ message: 'Название обязательно' }),
    color: z
        .string({ message: 'Название обязательно' })
        .default('#000000'),
    order: z.coerce
        .number()
        .min(0)
        .default(0),
})

export type TTagAccount = z.infer<typeof tagAccountSchema>
export type TTagAccountForm = z.infer<typeof tagAccountFormSchema>

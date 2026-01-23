import { z } from 'zod'

export const groupAccountSchema = z.object({
    id: z.number(),
    name: z.string(),
    isVisible: z.boolean(),
    order: z.number()
})

export const groupAccountFormSchema = z.object({
    name: z
        .string({ message: 'Название обязательно' })
        .nonempty({ message: 'Название обязательно' }),
    order: z.coerce
        .number()
        .min(0)
        .default(0),
    isVisible: z.coerce.boolean().default(true)
})

export type TGroupAccount = z.infer<typeof groupAccountSchema>
export type TGroupAccountForm = z.infer<typeof groupAccountFormSchema>

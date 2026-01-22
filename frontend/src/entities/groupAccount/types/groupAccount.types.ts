import { z } from 'zod'

export const groupAccountSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const groupAccountFormSchema = z.object({
    name: z
        .string({ message: 'Название обязательно' })
        .nonempty({ message: 'Название обязательно' }),
})

export type TGroupAccount = z.infer<typeof groupAccountSchema>
export type TGroupAccountForm = z.infer<typeof groupAccountFormSchema>

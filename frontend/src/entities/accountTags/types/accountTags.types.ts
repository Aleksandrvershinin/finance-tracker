import { z } from 'zod'

export const accountTagSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const accountTagFormSchema = z.object({
    name: z
        .string({ message: 'Название обязательно' })
        .nonempty({ message: 'Название обязательно' }),
})

export type TAccountTag = z.infer<typeof accountTagSchema>
export type TAccountTagForm = z.infer<typeof accountTagFormSchema>

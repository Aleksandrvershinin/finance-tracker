import { z } from 'zod'

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.enum(['INCOME', 'EXPENSE']),
})

export const categoryFormSchema = z.object({
    name: z
        .string({ message: 'Название обязательно' })
        .nonempty({ message: 'Название обязательно' }),
    type: z.enum(['INCOME', 'EXPENSE'], { message: 'Поле обязательно' }),
})

export type TCategory = z.infer<typeof categorySchema>
export type TCategoryForm = z.infer<typeof categoryFormSchema>

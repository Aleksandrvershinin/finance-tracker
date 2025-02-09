import { z } from 'zod'

export const categoryIdSchema = z.number({ message: 'Поле обязательно' })
export const TransactionTypeSchema = z.enum(['INCOME', 'EXPENSE'], {
    message: 'Поле обязательно',
})
export const categorySchema = z.object({
    id: categoryIdSchema,
    name: z.string(),
    type: TransactionTypeSchema,
})

export const categoryFormSchema = z.object({
    name: z
        .string({ message: 'Название обязательно' })
        .nonempty({ message: 'Название обязательно' }),
    type: TransactionTypeSchema,
})

export type TCategory = z.infer<typeof categorySchema>
export type TCategoryForm = z.infer<typeof categoryFormSchema>

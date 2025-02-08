import { accountIdSchema } from '@/entities/account/types/account.types'
import {
    categoryIdSchema,
    TransactionTypeSchema,
} from '@/entities/category/types/category.types'
import { validationMessages } from '@/shared/configs/validationMessages'
import { z } from 'zod'

export const transactionSchema = z.object({
    id: z.number(),
    accountId: accountIdSchema,
    categoryId: categoryIdSchema,
    amount: z.number(),
    date: z.date(),
    type: TransactionTypeSchema,
    comment: z.string().optional().nullable(),
})

const minValueAmount = 1

export const transactionFormSchema = z.object({
    accountId: accountIdSchema,
    categoryId: categoryIdSchema,
    amount: z.coerce
        .number({ message: validationMessages.mustNumber })
        .min(minValueAmount, {
            message: validationMessages.minLengthNumber(minValueAmount),
        }),
    date: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
        message: validationMessages.invalidDate,
    }),
    type: TransactionTypeSchema,
    comment: z.string().optional().nullable(),
})

export type TTransactionForm = z.infer<typeof transactionFormSchema>
export type TTransaction = z.infer<typeof transactionSchema>

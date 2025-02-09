import { accountIdSchema } from '@/entities/account/types/account.types'
import { validationMessages } from '@/shared/configs/validationMessages'
import { z } from 'zod'

export const transferSchema = z.object({
    id: z.number(),
    fromAccountId: accountIdSchema,
    toAccountId: accountIdSchema,
    amount: z.number(),
    date: z.string(),
    comment: z.string().optional().nullable(),
})

const minValueAmount = 1

export const transferFormSchema = z.object({
    fromAccountId: accountIdSchema,
    toAccountId: accountIdSchema,
    amount: z.coerce
        .number({ message: validationMessages.mustNumber })
        .min(minValueAmount, {
            message: validationMessages.minLengthNumber(minValueAmount),
        }),
    date: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
        message: validationMessages.invalidDate,
    }),
    comment: z.string().optional().nullable(),
})

export type TTransferForm = z.infer<typeof transferFormSchema>
export type TTransfer = z.infer<typeof transferSchema>

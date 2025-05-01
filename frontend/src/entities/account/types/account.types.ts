import { accountTagSchema } from '@/entities/accountTags/types/accountTags.types'
import { currencySchema } from '@/entities/currency/types/currency.types'
import { validationMessages } from '@/shared/configs/validationMessages'
import { z } from 'zod'

export const accountIdSchema = z.number({ message: 'Поле обязательно' })

export const accountSchema = z.object({
    id: accountIdSchema,
    balance: z.number(),
    initialBalance: z.number(),
    name: z.string(),
    currency: currencySchema,
    accountTag: accountTagSchema.nullable(),
})

export const accountFormSchema = z.object({
    name: z.string().nonempty({ message: validationMessages.required }),
    initialBalance: z.coerce
        .number({ message: validationMessages.mustNumber })
        .min(0, { message: validationMessages.minLengthNumber(0) }),
    accountTagId: z.number().optional().nullable(),
    // currencyId: z
    //     .number({ message: validationMessages.required })
    //     .transform((val) => Number(val))
    //     .refine((val) => !isNaN(val), {
    //         message: validationMessages.required,
    //     }),
})

export type TAccount = z.infer<typeof accountSchema>
export type TAccountForm = z.infer<typeof accountFormSchema>

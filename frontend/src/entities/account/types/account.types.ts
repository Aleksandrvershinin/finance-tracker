import { currencySchema } from '@/entities/currency/types/currency.types'
import { groupAccountSchema } from '@/entities/groupAccount/types/groupAccount.types'
import { tagAccountSchema } from '@/entities/tagAccount/types/tagAccount.types'
import { validationMessages } from '@/shared/configs/validationMessages'
import { z } from 'zod'

export const accountIdSchema = z.number({ message: 'Поле обязательно' })

export const accountSchema = z.object({
    id: accountIdSchema,
    balance: z.number(),
    initialBalance: z.number(),
    name: z.string(),
    currency: currencySchema,
    order: z.number(),
    accountGroup: groupAccountSchema.nullable(),
    accountTag: tagAccountSchema.nullable(),
})

export const accountFormSchema = z.object({
    name: z.string().nonempty({ message: validationMessages.required }),
    initialBalance: z.coerce
        .number({ message: validationMessages.mustNumber })
        .min(0, { message: validationMessages.minLengthNumber(0) }),
    order: z.coerce
        .number()
        .min(0)
        .default(0),
    accountTagId: z.number().optional().nullable(),
    groupId: z.number().optional().nullable(),
    // currencyId: z
    //     .number({ message: validationMessages.required })
    //     .transform((val) => Number(val))
    //     .refine((val) => !isNaN(val), {
    //         message: validationMessages.required,
    //     }),
})

const reorderAccountSchema = z.object({
    id: accountSchema.shape.id,
    order: accountSchema.shape.order,
    groupId: groupAccountSchema.shape.id.nullable(),
});

export type TAccount = z.infer<typeof accountSchema>
export type TAccountForm = z.infer<typeof accountFormSchema>
export type TReorderAccount = z.infer<typeof reorderAccountSchema>

import { currencySchema } from '@/entities/currency/types/currency.types'
import { z } from 'zod'

export const userSchema = z.object({
    id: z.number(),
    email: z.string(),
    currency: currencySchema,
    role: z.enum(['ADMIN', 'USER']),
})

export type TUser = z.infer<typeof userSchema>

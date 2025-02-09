import { z } from 'zod'

export const userSchema = z.object({
    id: z.number(),
    email: z.string(),
    role: z.enum(['ADMIN', 'USER']),
})

export type TUser = z.infer<typeof userSchema>

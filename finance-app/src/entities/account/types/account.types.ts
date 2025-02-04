import { z } from 'zod'

export const accountSchema = z.object({
  id: z.number(),
  balance: z.number(),
  name: z.string(),
})

export type TAccount = z.infer<typeof accountSchema>

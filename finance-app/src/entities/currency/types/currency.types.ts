import { z } from 'zod'

export const currencySchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  symbol: z.string(),
})

export type TCurrency = z.infer<typeof currencySchema>

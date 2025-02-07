import { TransactionType } from '@prisma/client'

export class TransactionDto {
    id: number
    accountId: number
    categoryId: number
    amount: number
    date: Date
    type: TransactionType
    comment?: string
}

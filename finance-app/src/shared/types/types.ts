// src/types.ts
export type Account = {
    id: number
    name: string
    balance: number
    currency: string
}

export type Transaction = {
    id: number
    amount: number
    type: 'INCOME' | 'EXPENSE'
    description: string
    date: string
    accountId: number
}

export type Transfer = {
    id: number
    fromAccountId: number
    toAccountId: number
    amount: number
    date: string
}

export interface ILocationState {
    from: Location
}

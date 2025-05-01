import { TransactionType } from '@prisma/client';
export declare class CreateTransactionDto {
    accountId: number;
    categoryId: number;
    amount: number;
    date: string;
    type: TransactionType;
    comment?: string;
}

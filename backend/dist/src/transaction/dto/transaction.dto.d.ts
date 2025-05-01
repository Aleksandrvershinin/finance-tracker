import { TransactionType } from '@prisma/client';
export declare class TransactionDto {
    id: number;
    accountId: number;
    categoryId: number;
    amount: number;
    date: Date;
    type: TransactionType;
    comment?: string;
}

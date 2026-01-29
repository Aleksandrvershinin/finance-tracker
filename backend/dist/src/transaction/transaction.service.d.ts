import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, User } from '@prisma/client';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: User['id'], dto: CreateTransactionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        accountId: number;
        categoryId: number;
        amount: number;
        date: Date;
        comment: string | null;
    }>;
    findAllForUser(userId: User['id']): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        accountId: number;
        categoryId: number;
        amount: number;
        date: Date;
        comment: string | null;
    }[]>;
    findOne(userId: User['id'], id: Transaction['id']): Promise<{
        account: {
            id: number;
            name: string;
            currencyId: number;
            createdAt: Date;
            updatedAt: Date;
            accountTagId: number | null;
            groupId: number | null;
            initialBalance: number;
            userId: number;
            balance: number;
            order: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        accountId: number;
        categoryId: number;
        amount: number;
        date: Date;
        comment: string | null;
    }>;
    update(userId: User['id'], id: Transaction['id'], dto: UpdateTransactionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        accountId: number;
        categoryId: number;
        amount: number;
        date: Date;
        comment: string | null;
    }>;
    remove(userId: User['id'], id: Transaction['id']): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        accountId: number;
        categoryId: number;
        amount: number;
        date: Date;
        comment: string | null;
    }>;
    validateUserTransaction(userId: User['id'], transactionId: Transaction['id']): Promise<{
        account: {
            id: number;
            name: string;
            currencyId: number;
            createdAt: Date;
            updatedAt: Date;
            accountTagId: number | null;
            groupId: number | null;
            initialBalance: number;
            userId: number;
            balance: number;
            order: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        accountId: number;
        categoryId: number;
        amount: number;
        date: Date;
        comment: string | null;
    }>;
}

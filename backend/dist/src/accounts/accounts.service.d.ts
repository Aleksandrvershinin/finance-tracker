import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { User } from '@prisma/client';
export declare class AccountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(user: User): Promise<({
        currency: {
            symbol: string;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
        accountTag: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            order: number;
            color: string;
        } | null;
        accountGroup: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            order: number;
            isVisible: boolean;
        } | null;
    } & {
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
    })[]>;
    create(data: CreateAccountDto, user: User): Promise<{
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
    }>;
    update(id: number, data: UpdateAccountDto, user: User): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}

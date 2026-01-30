import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { User } from '@prisma/client';
import { ReorderAccountDto } from './dto/reorder-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
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
            order: number;
            userId: number;
            color: string;
        } | null;
        accountGroup: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            userId: number;
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
        order: number;
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
        order: number;
        userId: number;
        balance: number;
    }>;
    update(id: number, updateAccountDto: UpdateAccountDto, user: User): Promise<{
        id: number;
        name: string;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        accountTagId: number | null;
        groupId: number | null;
        initialBalance: number;
        order: number;
        userId: number;
        balance: number;
    }>;
    reorder(dto: ReorderAccountDto[], user: User): Promise<void>;
}

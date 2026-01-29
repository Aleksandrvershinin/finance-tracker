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
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
        accountTag: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            order: number;
            color: string;
        } | null;
        accountGroup: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            order: number;
            isVisible: boolean;
        } | null;
    } & {
        name: string;
        id: number;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
        initialBalance: number;
        accountTagId: number | null;
        groupId: number | null;
        order: number;
    })[]>;
    create(data: CreateAccountDto, user: User): Promise<{
        name: string;
        id: number;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
        initialBalance: number;
        accountTagId: number | null;
        groupId: number | null;
        order: number;
    }>;
    update(id: number, updateAccountDto: UpdateAccountDto, user: User): Promise<{
        name: string;
        id: number;
        currencyId: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        balance: number;
        initialBalance: number;
        accountTagId: number | null;
        groupId: number | null;
        order: number;
    }>;
    reorder(dto: ReorderAccountDto[], user: User): Promise<void>;
}

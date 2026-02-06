import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        name: string;
        currencyId: number;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        loginCodeHash: string | null;
        loginCodeExpire: Date | null;
        loginAttempts: number;
        loginBlockedUntil: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        currencyId: number;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        loginCodeHash: string | null;
        loginCodeExpire: Date | null;
        loginAttempts: number;
        loginBlockedUntil: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        currencyId: number;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        loginCodeHash: string | null;
        loginCodeExpire: Date | null;
        loginAttempts: number;
        loginBlockedUntil: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserProfile(user: User): Promise<({
        currency: {
            symbol: string;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    } & {
        id: number;
        email: string;
        name: string;
        currencyId: number;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        loginCodeHash: string | null;
        loginCodeExpire: Date | null;
        loginAttempts: number;
        loginBlockedUntil: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}

import { PrismaService } from '../prisma/prisma.service';
export declare class CurrencyService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        symbol: string;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
    }[]>;
    create(createCurrencyDto: {
        code: string;
        name: string;
        symbol: string;
    }): Promise<{
        symbol: string;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
    }>;
    update(id: number, updateCurrencyDto: {
        code?: string;
        name?: string;
        symbol?: string;
    }): Promise<{
        symbol: string;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
    }>;
    remove(id: number): Promise<{
        symbol: string;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
    }>;
}

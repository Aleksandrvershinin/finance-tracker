import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transfer, User } from '@prisma/client';
export declare class TransfersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllForUser(userId: User['id']): Promise<Transfer[]>;
    createTransfer(createTransferDto: CreateTransferDto, user: User): Promise<any>;
    deleteTransfer(transferId: number, user: User): Promise<any>;
}

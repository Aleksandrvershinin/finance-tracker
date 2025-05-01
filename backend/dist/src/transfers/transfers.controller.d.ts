import { TransfersService } from './transfers.service';
import { Transfer, User } from '@prisma/client';
import { CreateTransferDto } from './dto/create-transfer.dto';
export declare class TransfersController {
    private readonly transferService;
    constructor(transferService: TransfersService);
    findAll(user: User): Promise<Transfer[]>;
    createTransfer(createTransferDto: CreateTransferDto, user: User): Promise<Transfer>;
    deleteTransfer(transferId: number, user: User): Promise<Transfer>;
}

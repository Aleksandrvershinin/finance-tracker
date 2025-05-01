import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, User } from '@prisma/client';
import { TransactionDto } from './dto/transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(user: User, createTransactionDto: CreateTransactionDto): TransactionDto;
    findAll(user: User): Promise<TransactionDto>;
    findOne(user: User, id: Transaction['id']): Promise<TransactionDto>;
    update(user: User, id: Transaction['id'], updateTransactionDto: UpdateTransactionDto): Promise<TransactionDto>;
    remove(user: User, id: number): Promise<TransactionDto>;
}

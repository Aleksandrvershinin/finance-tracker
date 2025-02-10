import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Put,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { GetUser } from 'src/auth/user.decorator'
import { Transaction, User } from '@prisma/client'
import { TransactionDto } from './dto/transaction.dto'
import { plainToInstance } from 'class-transformer'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    create(
        @GetUser() user: User,
        @Body() createTransactionDto: CreateTransactionDto,
    ) {
        const transaction = this.transactionService.create(
            user.id,
            createTransactionDto,
        )
        return plainToInstance(TransactionDto, transaction)
    }

    @Get()
    async findAll(@GetUser() user: User): Promise<TransactionDto> {
        const transactions = this.transactionService.findAllForUser(user.id)
        return plainToInstance(TransactionDto, transactions)
    }

    @Get(':id')
    async findOne(
        @GetUser() user: User,
        id: Transaction['id'],
    ): Promise<TransactionDto> {
        const transaction = await this.transactionService.findOne(user.id, id)
        return plainToInstance(TransactionDto, transaction)
    }

    @Put(':id')
    async update(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: Transaction['id'],
        @Body() updateTransactionDto: UpdateTransactionDto,
    ): Promise<TransactionDto> {
        const transaction = await this.transactionService.update(
            user.id,
            id,
            updateTransactionDto,
        )
        return plainToInstance(TransactionDto, transaction)
    }

    @Delete(':id')
    async remove(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<TransactionDto> {
        const transaction = await this.transactionService.remove(user.id, id)
        return plainToInstance(TransactionDto, transaction)
    }
}

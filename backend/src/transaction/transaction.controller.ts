import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
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
    findAll(@GetUser() user: User) {
        const transactions = this.transactionService.findAllForUser(user.id)
        return plainToInstance(TransactionDto, transactions)
    }

    @Get(':id')
    findOne(@GetUser() user: User, id: Transaction['id']) {
        const transaction = this.transactionService.findOne(user.id, id)
        return plainToInstance(TransactionDto, transaction)
    }

    @Patch(':id')
    update(
        @GetUser() user: User,
        id: Transaction['id'],
        @Body() updateTransactionDto: UpdateTransactionDto,
    ) {
        return this.transactionService.update(user.id, id, updateTransactionDto)
    }

    @Delete(':id')
    remove(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        return this.transactionService.remove(user.id, id)
    }
}

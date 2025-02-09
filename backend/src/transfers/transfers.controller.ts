import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'
import { TransfersService } from './transfers.service'
import { GetUser } from 'src/auth/user.decorator'
import { User } from '@prisma/client'
import { CreateTransferDto } from './dto/create-transfer.dto'

@UseGuards(JwtAuthGuard)
@Controller('transfers')
export class TransfersController {
    constructor(private readonly transferService: TransfersService) {}

    // Создание перевода
    @Post()
    async createTransfer(
        @Body() createTransferDto: CreateTransferDto,
        @GetUser() user: User, // Получаем пользователя
    ) {
        return this.transferService.createTransfer(createTransferDto, user)
    }

    // Удаление перевода
    @Delete(':id')
    async deleteTransfer(
        @Param('id') transferId: number,
        @GetUser() user: User, // Получаем пользователя
    ) {
        return this.transferService.deleteTransfer(transferId, user)
    }
}

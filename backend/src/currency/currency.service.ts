import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CurrencyService {
    constructor(private readonly prisma: PrismaService) {}

    // Получение всех валют
    async findAll() {
        return this.prisma.currency.findMany()
    }

    // Создание новой валюты
    async create(createCurrencyDto: {
        code: string
        name: string
        symbol: string
    }) {
        return this.prisma.currency.create({
            data: {
                code: createCurrencyDto.code,
                name: createCurrencyDto.name,
                symbol: createCurrencyDto.symbol,
            },
        })
    }

    // Обновление валюты
    async update(
        id: number,
        updateCurrencyDto: {
            code?: string
            name?: string
            symbol?: string
        },
    ) {
        return this.prisma.currency.update({
            where: { id },
            data: updateCurrencyDto,
        })
    }

    async remove(id: number) {
        return this.prisma.currency.delete({
            where: { id },
        })
    }
}

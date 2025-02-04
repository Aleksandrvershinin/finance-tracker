import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    ParseIntPipe,
    Put,
} from '@nestjs/common'
import { CurrencyService } from './currency.service'

@Controller('currencies')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {}

    @Get()
    findAll() {
        return this.currencyService.findAll() // Получение всех валют
    }

    // @Post()
    // create(
    //     @Body()
    //     createCurrencyDto: {
    //         code: string
    //         name: string
    //         symbol: string
    //     },
    // ) {
    //     return this.currencyService.create(createCurrencyDto) // Создание новой валюты
    // }

    // @Put(':id')
    // update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body()
    //     updateCurrencyDto: { code?: string; name?: string; symbol?: string },
    // ) {
    //     return this.currencyService.update(id, updateCurrencyDto) // Обновление валюты
    // }

    // @Delete(':id')
    // remove(@Param('id', ParseIntPipe) id: number) {
    //     return this.currencyService.remove(id)
    // }
}

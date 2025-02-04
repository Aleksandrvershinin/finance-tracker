import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    findAll() {
        return this.accountsService.findAll()
    }

    @Post()
    create(@Body() createAccountDto: CreateAccountDto) {
        return this.accountsService.create(createAccountDto)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAccountDto: UpdateAccountDto,
    ) {
        return this.accountsService.update(id, updateAccountDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.accountsService.remove(id)
    }
}

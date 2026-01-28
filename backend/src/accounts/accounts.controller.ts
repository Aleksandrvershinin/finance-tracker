import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'
import { User } from '@prisma/client'

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Get()
    findAll(@GetUser() user: User) {
        return this.accountsService.findAll(user)
    }

    @Post()
    create(@Body() data: CreateAccountDto, @GetUser() user: User) {
        return this.accountsService.create(data, user)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAccountDto: UpdateAccountDto,
        @GetUser() user: User,
    ) {
        return this.accountsService.update(id, updateAccountDto, user)
    }

    // @Delete(':id')
    // remove(@Param('id', ParseIntPipe) id: number) {
    //     return this.accountsService.remove(id)
    // }
}

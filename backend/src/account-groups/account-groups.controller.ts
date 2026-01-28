import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'
import { User } from '@prisma/client'
import { AccountGroupsService } from './account-groups.service'
import { CreateAccountGroupDto } from './dto/create-account-group.dto'
import { UpdateAccountGroupDto } from './dto/update-account-group.dto'

@UseGuards(JwtAuthGuard)
@Controller('account-groups')
export class AccountGroupsController {
    constructor(private readonly accountGroupsService: AccountGroupsService) { }

    @Post()
    create(
        @Body() data: CreateAccountGroupDto,
        @GetUser() user: User,
    ) {
        return this.accountGroupsService.create(data, user)
    }

    @Get()
    findAll(@GetUser() user: User) {
        return this.accountGroupsService.findAll(user)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: UpdateAccountGroupDto,
        @GetUser() user: User,
    ) {
        return this.accountGroupsService.update(+id, data, user)
    }

    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: User) {
        return this.accountGroupsService.remove(+id, user)
    }
}

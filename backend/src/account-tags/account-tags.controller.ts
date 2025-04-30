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
import { AccountTagsService } from './account-tags.service'
import { CreateAccountTagDto } from './dto/create-account-tag.dto'
import { UpdateAccountTagDto } from './dto/update-account-tag.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'
import { User } from '@prisma/client'

@UseGuards(JwtAuthGuard)
@Controller('account-tags')
export class AccountTagsController {
    constructor(private readonly accountTagsService: AccountTagsService) {}

    @Post()
    create(
        @Body() createAccountTagDto: CreateAccountTagDto,
        @GetUser() user: User,
    ) {
        return this.accountTagsService.create(createAccountTagDto, user)
    }

    @Get()
    findAll(@GetUser() user: User) {
        return this.accountTagsService.findAll(user)
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.accountTagsService.findOne(+id)
    // }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAccountTagDto: UpdateAccountTagDto,
        @GetUser() user: User,
    ) {
        return this.accountTagsService.update(+id, updateAccountTagDto, user)
    }

    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: User) {
        return this.accountTagsService.remove(+id, user)
    }
}

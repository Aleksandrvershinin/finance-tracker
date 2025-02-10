import { Controller, Get, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { plainToClass } from 'class-transformer'
import { GetUser } from 'src/auth/user.decorator'
import { User } from '@prisma/client'
import { UserDto } from './dto/user.dto'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // // POST-запрос для создания пользователя
    // @Post()
    // async create(@Body() createUserDto: CreateUserDto) {
    //   return this.usersService.create(createUserDto)
    // }

    // GET-запрос для получения всех пользователей
    // @Get()
    // async findAll() {
    //     return this.usersService.findAll()
    // }

    // Защищаем маршрут, чтобы только авторизованные пользователи могли получить доступ
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getUserProfile(@GetUser() user: User) {
        const userWithCurrency = await this.usersService.getUserProfile(user)
        const userDto = plainToClass(UserDto, userWithCurrency)
        return { message: 'User profile', user: userDto }
    }
}

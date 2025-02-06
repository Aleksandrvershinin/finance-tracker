import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { plainToClass } from 'class-transformer'
import { UserOutputDto } from './dto/user-output.dto'
import { GetUser } from 'src/auth/user.decorator'
import { User } from '@prisma/client'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles.decorator'

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
    @Get()
    async findAll() {
        return this.usersService.findAll()
    }

    // Защищаем маршрут, чтобы только авторизованные пользователи могли получить доступ
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getUserProfile(@GetUser() user: User) {
        const userDto = plainToClass(UserOutputDto, user)
        return { message: 'User profile', user: userDto }
    }

    @UseGuards(JwtAuthGuard, RolesGuard) // Применяем оба Guard: JWT и проверку ролей
    @Roles('admin') // Указываем, что только администратор может получить доступ
    @Get('admin')
    getAdminData() {
        return { message: 'Admin data' }
    }
}

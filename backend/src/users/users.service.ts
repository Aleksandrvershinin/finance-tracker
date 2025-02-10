import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client'
// import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        })
    }
    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        })
    }
    // // Создание нового пользователя
    // async create(createUserDto: CreateUserDto) {
    //   return this.prisma.user.create({
    //     data: createUserDto,
    //   })
    // }

    // Получение всех пользователей
    async findAll() {
        return this.prisma.user.findMany()
    }

    async getUserProfile(user: User) {
        const userProfile = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: { currency: true },
        })
        return userProfile
    }
}

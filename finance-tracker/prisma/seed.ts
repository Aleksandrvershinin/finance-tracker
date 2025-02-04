import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    // Добавляем валюты с использованием createMany
    await prisma.currency.createMany({
        data: [{ code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸' }],
        skipDuplicates: true, // Это работает в 6.3.0, но лучше проверить
    })

    console.log('Currencies seeded successfully.')

    // Создаём пользователя
    const hashedPassword = await bcrypt.hash('1234', 10) // Хэшируем пароль

    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: hashedPassword, // Используем хэшированный пароль
            role: 'USER', // Можно указать роль, например, 'user' или 'admin'
        },
    })

    console.log('Currencies and user seeded successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

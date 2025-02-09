import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.currency.createMany({
        data: [{ code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸' }],
        skipDuplicates: true,
    })

    console.log('Currencies seeded successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

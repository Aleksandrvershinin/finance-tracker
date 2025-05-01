"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.currency.createMany({
        data: [{ code: 'KZT', name: 'Казахстанский тенге', symbol: '₸' }],
        skipDuplicates: true,
    });
    await prisma.currency.createMany({
        data: [{ code: 'USD', name: 'Доллар США', symbol: '$' }],
        skipDuplicates: true,
    });
    await prisma.currency.createMany({
        data: [{ code: 'RUB', name: 'Российский рубль', symbol: '₽' }],
        skipDuplicates: true,
    });
    console.log('Currencies seeded successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { IsUniqueConstraint } from './validators/is-unique/is-unique.validator'
import { PrismaModule } from './prisma/prisma.module'
import { CurrencyModule } from './currency/currncy.module'
import { AccountsModule } from './accounts/accounts.module'
import { IsExistConstraint } from './validators/is-exist/is-exist.validator'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        CurrencyModule,
        AccountsModule,
        AuthModule,
        CategoriesModule,
        TransactionModule,
    ],
    providers: [IsUniqueConstraint, IsExistConstraint, TransactionService],
    controllers: [TransactionController],
})
export class AppModule {}

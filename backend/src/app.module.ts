import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { IsUniqueConstraint } from './validators/is-unique/is-unique.validator'
import { PrismaModule } from './prisma/prisma.module'
import { CurrencyModule } from './currency/currncy.module'
import { AccountsModule } from './accounts/accounts.module'
import { IsExistConstraint } from './validators/is-exist/is-exist.validator'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { TransactionModule } from './transaction/transaction.module'
import { TransfersModule } from './transfers/transfers.module'
import { AccountTagsModule } from './account-tags/account-tags.module'
import { AccountGroupsModule } from './account-groups/account-groups.module'
import { MailModule } from './mail/mail.module'
import { RecaptchaModule } from './recaptcha/recaptcha.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MailModule,
        PrismaModule,
        AuthModule,
        UsersModule,
        CurrencyModule,
        AccountsModule,
        CategoriesModule,
        TransactionModule,
        TransfersModule,
        AccountTagsModule,
        AccountGroupsModule,
        RecaptchaModule,
    ],
    providers: [IsUniqueConstraint, IsExistConstraint],
})
export class AppModule {}

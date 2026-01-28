"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const is_unique_validator_1 = require("./validators/is-unique/is-unique.validator");
const prisma_module_1 = require("./prisma/prisma.module");
const currncy_module_1 = require("./currency/currncy.module");
const accounts_module_1 = require("./accounts/accounts.module");
const is_exist_validator_1 = require("./validators/is-exist/is-exist.validator");
const auth_module_1 = require("./auth/auth.module");
const categories_module_1 = require("./categories/categories.module");
const transaction_module_1 = require("./transaction/transaction.module");
const transfers_module_1 = require("./transfers/transfers.module");
const account_tags_module_1 = require("./account-tags/account-tags.module");
const account_groups_module_1 = require("./account-groups/account-groups.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            currncy_module_1.CurrencyModule,
            accounts_module_1.AccountsModule,
            categories_module_1.CategoriesModule,
            transaction_module_1.TransactionModule,
            transfers_module_1.TransfersModule,
            account_tags_module_1.AccountTagsModule,
            account_groups_module_1.AccountGroupsModule,
        ],
        providers: [is_unique_validator_1.IsUniqueConstraint, is_exist_validator_1.IsExistConstraint],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
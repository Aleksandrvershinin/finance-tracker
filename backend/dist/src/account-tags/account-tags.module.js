"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTagsModule = void 0;
const common_1 = require("@nestjs/common");
const account_tags_service_1 = require("./account-tags.service");
const account_tags_controller_1 = require("./account-tags.controller");
let AccountTagsModule = class AccountTagsModule {
};
exports.AccountTagsModule = AccountTagsModule;
exports.AccountTagsModule = AccountTagsModule = __decorate([
    (0, common_1.Module)({
        controllers: [account_tags_controller_1.AccountTagsController],
        providers: [account_tags_service_1.AccountTagsService],
    })
], AccountTagsModule);
//# sourceMappingURL=account-tags.module.js.map
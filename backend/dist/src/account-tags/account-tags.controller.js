"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTagsController = void 0;
const common_1 = require("@nestjs/common");
const account_tags_service_1 = require("./account-tags.service");
const create_account_tag_dto_1 = require("./dto/create-account-tag.dto");
const update_account_tag_dto_1 = require("./dto/update-account-tag.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_decorator_1 = require("../auth/user.decorator");
let AccountTagsController = class AccountTagsController {
    constructor(accountTagsService) {
        this.accountTagsService = accountTagsService;
    }
    create(createAccountTagDto, user) {
        return this.accountTagsService.create(createAccountTagDto, user);
    }
    findAll(user) {
        return this.accountTagsService.findAll(user);
    }
    update(id, updateAccountTagDto, user) {
        return this.accountTagsService.update(+id, updateAccountTagDto, user);
    }
    remove(id, user) {
        return this.accountTagsService.remove(+id, user);
    }
};
exports.AccountTagsController = AccountTagsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_tag_dto_1.CreateAccountTagDto, Object]),
    __metadata("design:returntype", void 0)
], AccountTagsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountTagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_account_tag_dto_1.UpdateAccountTagDto, Object]),
    __metadata("design:returntype", void 0)
], AccountTagsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AccountTagsController.prototype, "remove", null);
exports.AccountTagsController = AccountTagsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('account-tags'),
    __metadata("design:paramtypes", [account_tags_service_1.AccountTagsService])
], AccountTagsController);
//# sourceMappingURL=account-tags.controller.js.map
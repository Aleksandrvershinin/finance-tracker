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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto, user) {
        return this.prisma.category.create({
            data: { ...createCategoryDto, userId: user.id },
        });
    }
    async findAll() {
        return this.prisma.category.findMany();
    }
    async findAllForUser(user) {
        return this.prisma.category.findMany({
            where: { userId: user.id },
        });
    }
    async findOne(categoryId, user) {
        return this.validateUserCategory(user.id, categoryId);
    }
    async update(categoryId, updateCategoryDto, user) {
        const category = await this.validateUserCategory(user.id, categoryId);
        return this.prisma.category.update({
            where: { id: category.id },
            data: updateCategoryDto,
        });
    }
    async remove(categoryId, user) {
        const category = await this.validateUserCategory(user.id, categoryId);
        return this.prisma.category.delete({
            where: { id: category.id },
        });
    }
    async validateUserCategory(userId, categoryId) {
        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Категория не найдена');
        }
        if (category.userId !== userId) {
            throw new common_1.ForbiddenException('Нет доступа к данной категории');
        }
        return category;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map
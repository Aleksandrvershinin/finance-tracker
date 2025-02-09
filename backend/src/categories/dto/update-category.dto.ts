// src/categories/dto/update-category.dto.ts
import { IsString, IsEnum, IsOptional } from 'class-validator'
import { TransactionType } from '@prisma/client'

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsEnum(TransactionType)
    type?: TransactionType
}

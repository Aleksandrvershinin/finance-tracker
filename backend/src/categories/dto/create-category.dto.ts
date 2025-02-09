// src/categories/dto/create-category.dto.ts
import { IsString, IsEnum } from 'class-validator'
import { TransactionType } from '@prisma/client'

export class CreateCategoryDto {
    @IsString()
    name: string

    @IsEnum(TransactionType)
    type: TransactionType
}

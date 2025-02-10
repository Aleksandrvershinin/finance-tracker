// src/categories/dto/update-category.dto.ts
import { IsString } from 'class-validator'

export class UpdateCategoryDto {
    @IsString()
    name: string
}

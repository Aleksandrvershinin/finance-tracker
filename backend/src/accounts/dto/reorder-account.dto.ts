import { IsInt, IsOptional } from 'class-validator'

export class ReorderAccountDto {
    @IsInt()
    id: number

    @IsInt()
    order: number

    @IsOptional()
    @IsInt()
    groupId?: number
}
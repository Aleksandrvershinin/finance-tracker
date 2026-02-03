import { IsInt } from 'class-validator'

export class ReorderAccountTagDto {
    @IsInt()
    id: number

    @IsInt()
    order: number
}
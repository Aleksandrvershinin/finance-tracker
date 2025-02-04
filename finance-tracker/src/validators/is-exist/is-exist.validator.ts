import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
    constructor(private prisma: PrismaService) {}

    async validate(value: any, args: ValidationArguments) {
        const [tableName, fieldName] = args.constraints
        if (value === '' || value === null || value === undefined) {
            throw new Error(`${fieldName} не валидно`)
        }
        // Получаем модель через PrismaService
        const model = this.prisma[tableName] // Используем динамическое получение модели

        // Проверяем, существует ли модель и поддерживает ли метод findUnique
        if (
            !model ||
            !('findUnique' in model) ||
            typeof model.findUnique !== 'function'
        ) {
            throw new Error(
                `Модель ${tableName} не поддерживает метод findUnique`,
            )
        }

        // Используем findUnique для проверки существования
        const record = await model.findUnique({
            where: { [fieldName]: value },
        })

        return !!record // Если запись найдена, возвращаем true (существует), если нет — false
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} ${args.value} не существует`
    }
}

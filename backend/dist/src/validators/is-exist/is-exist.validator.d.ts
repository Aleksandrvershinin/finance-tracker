import { PrismaService } from '../../prisma/prisma.service';
import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsExistConstraint implements ValidatorConstraintInterface {
    private prisma;
    constructor(prisma: PrismaService);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}

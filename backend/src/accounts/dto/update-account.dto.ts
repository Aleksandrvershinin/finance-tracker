import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) { }

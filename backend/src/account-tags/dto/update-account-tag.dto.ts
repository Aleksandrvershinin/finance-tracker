import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountTagDto } from './create-account-tag.dto';

export class UpdateAccountTagDto extends PartialType(CreateAccountTagDto) {}

import { Module } from '@nestjs/common';
import { AccountTagsService } from './account-tags.service';
import { AccountTagsController } from './account-tags.controller';

@Module({
  controllers: [AccountTagsController],
  providers: [AccountTagsService],
})
export class AccountTagsModule {}

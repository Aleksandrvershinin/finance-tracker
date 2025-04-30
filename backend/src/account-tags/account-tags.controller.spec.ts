import { Test, TestingModule } from '@nestjs/testing';
import { AccountTagsController } from './account-tags.controller';
import { AccountTagsService } from './account-tags.service';

describe('AccountTagsController', () => {
  let controller: AccountTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTagsController],
      providers: [AccountTagsService],
    }).compile();

    controller = module.get<AccountTagsController>(AccountTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

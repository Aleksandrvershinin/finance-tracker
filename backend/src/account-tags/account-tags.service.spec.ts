import { Test, TestingModule } from '@nestjs/testing';
import { AccountTagsService } from './account-tags.service';

describe('AccountTagsService', () => {
  let service: AccountTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountTagsService],
    }).compile();

    service = module.get<AccountTagsService>(AccountTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

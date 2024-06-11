import { Test, TestingModule } from '@nestjs/testing';
import { ArticleInstanceService } from './article-instance.service';

describe('ArticleInstanceService', () => {
  let service: ArticleInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleInstanceService],
    }).compile();

    service = module.get<ArticleInstanceService>(ArticleInstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ArticleInstanceController } from './article-instance.controller';
import { ArticleInstanceService } from './article-instance.service';

describe('ArticleInstanceController', () => {
  let controller: ArticleInstanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleInstanceController],
      providers: [ArticleInstanceService],
    }).compile();

    controller = module.get<ArticleInstanceController>(ArticleInstanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

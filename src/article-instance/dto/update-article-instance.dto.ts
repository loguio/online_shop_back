import { PartialType } from '@nestjs/swagger';
import { CreateArticleInstanceDto } from './create-article-instance.dto';

export class UpdateArticleInstanceDto extends PartialType(CreateArticleInstanceDto) {}

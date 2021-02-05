import { Resolver } from '@nestjs/graphql';
import { ImageFileWithInsight } from 'src/file/models/image-file-w-insight.model';
import { SearchService } from './search.service';

@Resolver(() => ImageFileWithInsight)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { ImageFileWithInsight } from 'src/file/models/image-file-w-insight.model';
import { SearchByWordArgs } from './dtos/args/search-by-word.args';
import { SearchReponseDto } from './dtos/search-response.dto';
import { SearchService } from './search.service';

@Resolver(() => ImageFileWithInsight)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => SearchReponseDto)
  async searchByWord(@Args() args: SearchByWordArgs) {
    return this.searchService.searchLabel(args.userId, args.word);
  }
}

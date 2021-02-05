import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { FileModule } from 'src/file/file.module';
import { InsightModule } from 'src/insight/insight.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  imports: [ConfigModule, FileModule, InsightModule],
  providers: [SearchService, SearchResolver],
})
export class SearchModule {}

import { Module } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { InsightController } from './insight.controller';
import { InsightService } from './insight.service';

@Module({
  imports: [FileModule],
  providers: [InsightService],
  controllers: [InsightController],
})
export class InsightModule {}

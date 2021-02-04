import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { FileModule } from 'src/file/file.module';
import { HttpConfigService } from './http.config.service';
import { InsightWorkerService } from './insight-worker.service';
import { InsightService } from './insight.service';

@Module({
  imports: [
    ConfigModule,
    FileModule,
    HttpModule.registerAsync({ useClass: HttpConfigService }),
  ],
  providers: [InsightService, InsightWorkerService],
})
export class InsightModule {}

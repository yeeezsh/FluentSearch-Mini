import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { FileModule } from 'src/file/file.module';
import { HttpConfigService } from './http.config.service';
import { InsightWorkerService } from './insight-worker.service';
import { insightProviders } from './insight.providers';
import { InsightService } from './insight.service';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => FileModule),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  providers: [InsightService, InsightWorkerService, ...insightProviders],
  exports: [InsightService],
})
export class InsightModule {}

import {
  HttpService,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { APP_CONFIG } from 'src/config/config.constant';
import { ConfigurationInterface } from 'src/config/config.interface';
@Injectable()
export class InsightWorkerService implements OnModuleInit {
  constructor(
    private insightML: HttpService,
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
  ) {}
  async onModuleInit() {
    try {
      Logger.log('Insight ML: initializing');

      const res = await this.insightML.get('/info').toPromise();
      if (res.status === 200) Logger.log('Insight ML : ready');
      else Logger.error('Insight ML : not ready');
      Logger.log(res.data);
    } catch (err) {
      Logger.error(err);
    }
  }
}

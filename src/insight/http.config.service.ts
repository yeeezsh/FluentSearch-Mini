import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Inject,
  Injectable,
} from '@nestjs/common';
import { APP_CONFIG } from 'src/config/config.constant';
import { ConfigurationInterface } from 'src/config/config.interface';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
  ) {}
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 30 * 1000,
      maxRedirects: 5,
      baseURL: `http://${this.appConfig.ml_endpoint}`,
      responseType: 'json',
    };
  }
}

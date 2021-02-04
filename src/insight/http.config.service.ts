import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 30 * 1000,
      maxRedirects: 5,
      baseURL: 'http://insight-ml:8080',
      responseType: 'json',
    };
  }
}

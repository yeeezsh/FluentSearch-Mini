import { HttpService, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class InsightWorkerService implements OnModuleInit {
  constructor(private httpService: HttpService) {}
  onModuleInit() {
    Logger.log('initializing worker');
  }
}

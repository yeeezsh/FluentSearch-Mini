import {
  HttpService,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  DeepDetectRequestAPI,
  DeepDetectResponseAPI,
  InsightSchema,
  LanguageEnum,
  ModelEnum,
} from 'fluentsearch-types';
import { Model } from 'mongoose';
import filePathJoin from 'src/common/utils/file-path-join';
import { APP_CONFIG } from 'src/config/config.constant';
import { ConfigurationInterface } from 'src/config/config.interface';
import { INSIGHT_MODEL } from './insight.providers';
import { InsightDoc } from './schema/insight.schema';

@Injectable()
export class InsightService {
  constructor(
    private insightML: HttpService,
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
    @Inject(INSIGHT_MODEL) private readonly insightModel: Model<InsightDoc>,
  ) {}
  async predict(fileId: string): Promise<void> {
    const MODEL_ENDPOINT = 'detection_600';
    const payload: DeepDetectRequestAPI = {
      service: MODEL_ENDPOINT,
      parameters: {
        output: {
          confidence_threshold: 0.5,
          bbox: true,
        },
        mllib: {
          gpu: true,
        },
      },
      data: [
        filePathJoin(this.appConfig.hostname, fileId, this.appConfig.port),
      ],
    };

    console.log(payload);

    const res = (await this.insightML.post(MODEL_ENDPOINT, payload).toPromise())
      .data as DeepDetectResponseAPI;
    const { body, status } = res;
    if (status.code !== 200) throw new InternalServerErrorException(status.msg);
    const now = new Date();
    const predictions = body.predictions;
    for (const pred of predictions) {
      for (const classPred of pred.classes) {
        await this.insightModel.create({
          result: classPred.cat,
          model: ModelEnum.detection_600,
          bbox: classPred.bbox,
          prob: classPred.prob,
          lang: LanguageEnum.enus,
          createAt: now,
          updateAt: now,
        } as Omit<InsightSchema, '_id'>);
      }
    }

    Logger.log(res);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { FileTypeEnum, InsightInfoDto } from 'fluentsearch-types';
import { Model, Types } from 'mongoose';
import filePathJoin from 'src/common/utils/file-path-join';
import { APP_CONFIG } from 'src/config/config.constant';
import { ConfigurationInterface } from 'src/config/config.interface';
import { FILE_MODEL } from 'src/file/file.providers';
import { ImageFileWithInsight } from 'src/file/models/image-file-w-insight.model';
import { AllFile, AllFileDoc } from 'src/file/schema/file.schema';
import { INSIGHT_MODEL } from 'src/insight/insight.providers';
import { InsightDoc } from 'src/insight/schema/insight.schema';
import { SearchReponseDto } from './dtos/search-response.dto';

@Injectable()
export class SearchService {
  constructor(
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
    @Inject(FILE_MODEL) private readonly fileModel: Model<AllFileDoc>,
    @Inject(INSIGHT_MODEL) private readonly insightModel: Model<InsightDoc>,
  ) {}

  async searchLabel(userId: string, word: string): Promise<SearchReponseDto> {
    console.log(userId, word);
    const searchLists = await this.insightModel.aggregate([
      {
        $match: {
          result: {
            $regex: `${word.toLocaleLowerCase()}`,
            $options: 'i',
          },
        },
      },
      {
        $project: {
          fileId: 1,
          result: 1,
        },
      },
    ]);

    const filesId = searchLists.map(el => Types.ObjectId(el.fileId));
    const autocomplete = [...new Set(searchLists.map(el => el.result))];

    const files = await this.fileModel.aggregate([
      {
        $match: {
          _id: {
            $in: filesId,
          },
        },
      },
      {
        $sort: { createAt: -1 },
      },
    ]);

    console.log(files);

    const mappedQuery = files.map(async (file: AllFile) => {
      const insights = ((await this.insightModel.find({
        fileId: file._id,
      })) as unknown) as InsightInfoDto[];

      return {
        _id: file._id,
        label: file.label,
        owner: file.owner,
        meta: {
          size: file.meta.size,
          filename: file.label,
          extension: file.meta.extension,
          contentType: file.meta.contentType,
          width: file.meta.width,
          height: file.meta.height,
          dpi: 72,
        },
        zone: file.zone,
        type: FileTypeEnum.Image,
        insight: insights,

        createAt: file.createAt,
        updateAt: file.updateAt,
        uri: filePathJoin(
          this.appConfig.hostname,
          file._id,
          this.appConfig.port,
        ),
      } as ImageFileWithInsight;
    });

    const mapped = (await Promise.all(mappedQuery)) as ImageFileWithInsight[];

    return {
      autocomplete,
      result: mapped,
    };
  }
}

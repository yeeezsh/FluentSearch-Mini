import { Injectable } from '@nestjs/common';
import cocoSsd from '@tensorflow-models/coco-ssd';
// import {FileR} from '@tensorflow/tfjs';
import { FileService } from 'src/file/file.service';
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');

@Injectable()
export class InsightService {
  constructor(private readonly fileService: FileService) {}

  async predict(filesId: string[]) {
    const model = await cocoSsd.load();
    for (const file of filesId) {
      const data = await this.fileService.getFile(file);
      console.log(data);
      //   const image = tf.FromPixels(data);
      //   tf.FromPixels(data);
      //   const predictions = await model.detect([]);
    }
  }
}

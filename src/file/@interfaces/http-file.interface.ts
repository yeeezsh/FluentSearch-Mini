export enum MIME {
  IMG_PNG = 'image/png',
  IMG_JPG = 'image/jpg',
  IMG_JPEG = 'image/jpeg',
}

export interface HTTPFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: MIME;
  id: string;
  filename: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  metadata: object;
  bucketName: string;
  chunkSize: number;
  size: number;
  md5: string;
  uploadDate: Date;
  contentType: MIME;
}

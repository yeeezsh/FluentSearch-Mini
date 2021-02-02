import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/database/constants/database.constant';
import { fileSchema } from './schema/file.schema';

export const FILE_MODEL = 'FILE_MODEL';
export const fileProviders: Provider[] = [
  {
    provide: FILE_MODEL,
    useFactory: async (connection: Connection) =>
      connection.model('file', fileSchema),
    inject: [DATABASE_CONNECTION],
  },
];

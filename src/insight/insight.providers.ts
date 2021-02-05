import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/database/constants/database.constant';
import { insightSchema } from './schema/insight.schema';

export const INSIGHT_MODEL = 'INSIGHT_MODEL';

export const insightProviders: Provider[] = [
  {
    provide: INSIGHT_MODEL,
    useFactory: async (connection: Connection) =>
      connection.model('insight', insightSchema),
    inject: [DATABASE_CONNECTION],
  },
];

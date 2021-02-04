import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { FileModule } from './file/file.module';
import { InsightModule } from './insight/insight.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: false,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    FileModule,
    InsightModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

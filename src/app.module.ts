import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpListController } from './op-list/op-list.controller';
import { OpListModule } from './op-list/op-list.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/nest'), OpListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

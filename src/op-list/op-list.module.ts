import { Module } from '@nestjs/common';
import { OpListController } from './op-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OpSchema, R6Operator } from './schemas/operators.schema';

@Module({
  controllers: [OpListController],
  imports: [
    MongooseModule.forFeature([{ name: R6Operator.name, schema: OpSchema }]),
  ],
})
export class OpListModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OperatorDocument = R6Operator & Document;

@Schema()
export class R6Operator {
  @Prop()
  name: string;
  @Prop()
  logo: string;
  @Prop()
  speed: number;
  @Prop()
  armor: number;
  @Prop()
  faction: string;
  @Prop()
  operation: string;
  @Prop()
  attacker: boolean;
}

export const OpSchema = SchemaFactory.createForClass(R6Operator);

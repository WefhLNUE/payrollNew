import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Allowance extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'pending', enum: ['approved', 'pending', 'rejected'] })
  status: string;
}

export const AllowanceSchema = SchemaFactory.createForClass(Allowance);

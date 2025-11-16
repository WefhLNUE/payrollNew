import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class CompanyConfiguration extends Document {
  @Prop({ required: true })
  payDate: Date; // e.g., '2025-12-31'

  @Prop({ required: true })
  timeZone: string; // 'Africa/Cairo'

  @Prop({ required: true })
  currency: string; // 'EGP'
}

export const CompanyConfigurationSchema =
  SchemaFactory.createForClass(CompanyConfiguration);

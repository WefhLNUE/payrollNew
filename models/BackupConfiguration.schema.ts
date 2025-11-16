import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class BackupConfiguration extends Document {
  @Prop({ required: true, enum: ['daily', 'weekly', 'monthly'] })
  frequency: string;

  @Prop({ required: true })
  time: string; // '02:00' for 2 AM

  @Prop({ required: true })
  destination: string;

  @Prop({ default: 'inactive', enum: ['inactive', 'active'] })
  status: string;
}

export const BackupConfigurationSchema =
  SchemaFactory.createForClass(BackupConfiguration);

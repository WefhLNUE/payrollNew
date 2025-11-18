import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PayType extends Document {
  @Prop({ required: true })
  name: string; // e.g., "Monthly Full-Time"

  @Prop()
  description: string;

  // REQ-PY-5, BR-1, BR-2: Define employee pay types
  @Prop({
    required: true,
    enum: ['hourly', 'daily', 'weekly', 'monthly', 'contract-based'],
  })
  type: string;

  // Contract dates only required for contract-based types
  // VALIDATION: If type is 'contract-based', contractStartDate and contractEndDate are required
  // VALIDATION: contractEndDate must be after contractStartDate
  @Prop({ required: false })
  contractStartDate: Date; // required: false, only for contract-based

  @Prop({ required: false })
  contractEndDate: Date; // required: false, only for contract-based

  // REQ-PY-18: Created by Payroll Specialist
  @Prop({ type: String, ref: 'User', required: true })
  createdBy: string; // ref to User - Payroll Specialist

  // REQ-PY-18: Approved by Payroll Manager
  @Prop({ type: String, ref: 'User' })
  approvedBy: string; // ref to User - Payroll Manager

  @Prop()
  approvalDate: Date;

  // Phase 1: Must be in draft status initially
  @Prop({
    default: 'draft',
    enum: ['draft', 'approved', 'rejected'],
  })
  status: string;

  @Prop()
  rejectionReason: string;

  @Prop()
  notes: string;
}

export const PayTypeSchema = SchemaFactory.createForClass(PayType);

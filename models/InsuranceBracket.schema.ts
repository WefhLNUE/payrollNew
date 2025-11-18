import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class InsuranceBracket extends Document {
  // REQ-PY-21, BR-7: Support multiple insurance types
  @Prop({
    required: true,
    enum: ['health', 'social', 'pension', 'unemployment'],
  })
  insuranceType: string;

  @Prop({ required: true })
  name: string; // e.g., "Social Insurance Bracket 1"

  @Prop()
  description: string;

  // REQ-PY-21: Configure insurance brackets with defined salary ranges
  // BR-31: Brackets must not overlap (validation should be done at application level)
  @Prop({ required: true })
  salaryRangeMin: number; // minimum salary for this bracket

  @Prop()
  salaryRangeMax: number; // maximum salary, null for unlimited top bracket

  // REQ-PY-21: Both employer and employee contribution percentages
  @Prop({ required: true })
  employeeContributionPercentage: number;

  @Prop({ required: true })
  employerContributionPercentage: number;

  @Prop({ required: true })
  effectiveFrom: Date;

  @Prop()
  effectiveTo: Date; // optional

  // REQ-PY-22: Created by Payroll Specialist
  @Prop({ type: String, ref: 'User', required: true })
  createdBy: string; // ref to User - Payroll Specialist

  // REQ-PY-22: Approved by HR Manager
  @Prop({ type: String, ref: 'User' })
  approvedBy: string; // ref to User - HR Manager

  @Prop()
  approvalDate: Date;

  // Phase 2: Must be in draft status initially
  @Prop({
    default: 'draft',
    enum: ['draft', 'approved', 'rejected'],
  })
  status: string;

  @Prop()
  rejectionReason: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  notes: string;
}

export const InsuranceBracketSchema =
  SchemaFactory.createForClass(InsuranceBracket);

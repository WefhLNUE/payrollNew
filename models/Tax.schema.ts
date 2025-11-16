import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// REQ-PY-10, REQ-PY-12, BR-5, BR-6, BR-20: Tax Configuration Management
@Schema({ timestamps: true })
export class Tax extends Document {
  @Prop({ required: true })
  taxYear: number; // e.g., 2025, required

  @Prop({ default: 'Egypt' })
  country: string;

  // REQ-PY-12: Track effective dates for when laws change
  // VALIDATION: effectiveTo must be after effectiveFrom if provided
  @Prop({ required: true })
  effectiveFrom: Date;

  @Prop()
  effectiveTo: Date; // when law changes/expires

  // Different tax types (income tax, social insurance, stamp duty, health insurance)
  @Prop({
    required: true,
    enum: ['income_tax', 'social_insurance', 'stamp_duty', 'health_insurance'],
  })
  taxType: string;

  // BR-5: Progressive tax rates with multiple brackets
  // VALIDATION: Brackets must not overlap
  // VALIDATION: Brackets must be in ascending order by minIncome
  @Prop([
    {
      minIncome: { type: Number, required: true },
      maxIncome: { type: Number }, // null for unlimited top bracket
      rate: { type: Number, required: true }, // percentage, required
      fixedAmount: { type: Number, default: 0 }, // base tax for bracket, default: 0
    },
  ])
  brackets: Array<{
    minIncome: number;
    maxIncome: number | null;
    rate: number;
    fixedAmount: number;
  }>;

  // BR-6: Support exemptions and thresholds
  @Prop({ default: 0 })
  personalExemption: number;

  @Prop({ default: 0 })
  dependentExemption: number;

  @Prop({ default: 0 })
  standardDeduction: number;

  @Prop()
  maxAnnualTax: number; // optional cap

  @Prop({ default: 0 })
  minTaxableIncome: number;

  // REQ-PY-10: Requires Legal Admin to configure
  @Prop({ type: String, ref: 'User', required: true })
  configuredBy: string; // ref to User - Legal Admin per REQ-PY-10

  // REQ-PY-18: Payroll Manager to approve
  @Prop({ type: String, ref: 'User' })
  approvedBy: string; // ref to User - Payroll Manager per REQ-PY-18

  @Prop()
  approvalDate: Date;

  // BR-20: Must comply with Egyptian labor law 2025
  // Only one active configuration per taxType per taxYear
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

export const TaxSchema = SchemaFactory.createForClass(Tax);

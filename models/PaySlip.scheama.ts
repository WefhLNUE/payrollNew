import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Payslip extends Document {
  // REQ-PY-8: Basic payslip information
  @Prop({ type: String, ref: 'Employee', required: true })
  employeeId: string; // ref to Employee

  @Prop({ type: String, ref: 'PayrollCycle', required: true })
  payrollCycleId: string; // ref to PayrollCycle

  @Prop({ required: true })
  payPeriodStart: Date;

  @Prop({ required: true })
  payPeriodEnd: Date;

  @Prop({ required: true })
  payPeriodMonth: number;

  @Prop({ required: true })
  payPeriodYear: number;

  @Prop({ required: true })
  generatedDate: Date; // when payslip was created

  @Prop({ required: true })
  payDate: Date; // when payment was made

  // EARNINGS SECTION
  @Prop({ required: true })
  baseSalary: number;

  @Prop([String])
  allowances: string[]; // array of Allowance IDs

  @Prop({ default: 0 })
  totalAllowances: number;

  @Prop({ type: String, ref: 'SigningBonus' })
  signingBonusId: string; // ref to SigningBonus, optional

  @Prop({ default: 0 })
  signingBonusAmount: number;

  @Prop({ type: String, ref: 'ResignationBenefit' })
  resignationBenefitId: string; // ref to ResignationBenefit, optional

  @Prop({ default: 0 })
  resignationBenefitAmount: number;

  @Prop({ type: String, ref: 'TerminationBenefit' })
  terminationBenefitId: string; // ref to TerminationBenefit, optional

  @Prop({ default: 0 })
  terminationBenefitAmount: number;

  @Prop({ default: 0 })
  leaveCompensation: number; // from Leaves module

  @Prop({ required: true })
  grossSalary: number;

  // DEDUCTIONS SECTION
  @Prop([String])
  deductions: string[]; // array of Deduction IDs

  @Prop({ default: 0 })
  totalDeductions: number;

  @Prop({ type: String, ref: 'Tax' })
  taxBracketId: string; // ref to Tax

  @Prop({ default: 0 })
  taxDeduction: number;

  @Prop({ type: String, ref: 'InsuranceBracket' })
  insuranceBracketId: string; // ref to InsuranceBracket

  @Prop({ default: 0 })
  insuranceDeduction: number;

  // BR-35: Penalties from Time Management and Misconduct
  @Prop({
    unpaidDays: { type: Number, default: 0 },
    missingHours: { type: Number, default: 0 },
    misconductPenalties: { type: Number, default: 0 },
    totalPenalties: { type: Number, default: 0 },
  })
  penalties: {
    unpaidDays: number;
    missingHours: number;
    misconductPenalties: number;
    totalPenalties: number;
  };

  // BR-17, BR-36: Detailed Breakdown for Transparency
  @Prop({
    grossSalary: { type: Number, required: true },
    totalAllowances: { type: Number, default: 0 },
    totalBonuses: { type: Number, default: 0 },
    leaveCompensation: { type: Number, default: 0 },
    totalBenefits: { type: Number, default: 0 },
    totalEarnings: { type: Number, required: true },
    taxDeduction: { type: Number, default: 0 },
    insuranceDeduction: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 },
    totalPenalties: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },
  })
  breakdown: {
    grossSalary: number;
    totalAllowances: number;
    totalBonuses: number;
    leaveCompensation: number;
    totalBenefits: number;
    totalEarnings: number;
    taxDeduction: number;
    insuranceDeduction: number;
    otherDeductions: number;
    totalPenalties: number;
    totalDeductions: number;
    netSalary: number;
  };

  // FINAL AMOUNTS
  // Net Salary = Gross - (Taxes + Insurance + Deductions + Penalties)
  @Prop({ required: true })
  netSalary: number;

  // REQ-PY-15: Auto-generated after Finance Staff approval
  @Prop({
    default: 'draft',
    enum: ['draft', 'under_review', 'approved', 'locked', 'paid', 'rejected'],
  })
  status: string;

  @Prop()
  downloadUrl: string; // for PDF

  @Prop()
  notes: string;
}

export const PayslipSchema = SchemaFactory.createForClass(Payslip);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// REQ-PY-20, REQ-PY-30-32, BR-26, BR-27, BR-29: Termination Benefit Management
@Schema({ timestamps: true })
export class TerminationBenefit extends Document {
  // Linked to employee and offboarding process
  @Prop({ type: String, ref: 'Employee', required: true })
  employeeId: string; // ref to Employee, required

  @Prop({ type: String, ref: 'Offboarding', required: true })
  offboardingId: string; // ref to Offboarding, required

  @Prop({
    required: true,
    enum: [
      'voluntary_resignation',
      'involuntary_termination',
      'mutual_agreement',
      'end_of_contract',
    ],
  })
  terminationType: string;

  @Prop({ required: true })
  terminationDate: Date;

  @Prop({ required: true })
  yearsOfService: number;

  @Prop({ required: true })
  lastBaseSalary: number;

  // Calculate termination benefits (severance pay, end-of-service gratuity, pending compensation)
  @Prop({ default: 0 })
  severancePay: number;

  @Prop({ default: 0 })
  endOfServiceGratuity: number;

  @Prop({ default: 0 })
  pendingAllowances: number;

  @Prop({ default: 0 })
  unusedLeaveEncashment: number; // from Leaves module

  @Prop({ default: 0 })
  noticePeriodPay: number;

  // CALCULATION FORMULA: Total = Severance Pay + End-of-Service Gratuity + Pending Allowances + Unused Leave Encashment + Notice Period Pay
  @Prop({ required: true })
  totalBenefitAmount: number;

  @Prop()
  approvedBenefitAmount: number; // may differ after review

  @Prop()
  calculationNotes: string; // how amounts were calculated

  // Created by from Offboarding/HR
  @Prop({ type: String, ref: 'User', required: true })
  createdBy: string; // ref to User - from Offboarding/HR

  // REQ-PY-31: Review and approval workflow (Phase 0 of Payroll Execution)
  // Reviewed by Payroll Specialist
  @Prop({ type: String, ref: 'User' })
  reviewedBy: string; // ref to User - Payroll Specialist per REQ-PY-31

  @Prop()
  reviewedDate: Date;

  // Approved by Payroll Manager
  @Prop({ type: String, ref: 'User' })
  approvedBy: string; // ref to User - Payroll Manager per REQ-PY-31

  @Prop()
  approvedDate: Date;

  // BR-26: Cannot be processed until HR clearance complete
  // BR-26: Cannot process until HR clearance complete (check hrClearanceStatus === 'cleared')
  @Prop({
    default: 'pending',
    enum: ['pending', 'cleared', 'blocked'],
  })
  hrClearanceStatus: string;

  @Prop()
  hrClearanceDate: Date;

  // Status must default to 'pending'
  @Prop({
    default: 'pending',
    enum: ['pending', 'approved', 'rejected', 'paid'],
  })
  status: string;

  @Prop()
  paymentDate: Date;

  @Prop({ type: String, ref: 'PayrollCycle' })
  payrollCycleId: string; // ref to PayrollCycle

  @Prop()
  rejectionReason: string;

  // BR-27: Manual adjustments require Payroll Specialist approval (log in editHistory)
  // REQ-PY-32: Payroll Specialist can edit if status is 'pending'
  @Prop([
    {
      editedBy: { type: String, ref: 'User', required: true },
      editedDate: { type: Date, required: true },
      previousAmount: { type: Number, required: true },
      newAmount: { type: Number, required: true },
      reason: { type: String, required: true },
    },
  ])
  editHistory: Array<{
    editedBy: string;
    editedDate: Date;
    previousAmount: number;
    newAmount: number;
    reason: string;
  }>;

  @Prop()
  notes: string;
}

export const TerminationBenefitSchema =
  SchemaFactory.createForClass(TerminationBenefit);

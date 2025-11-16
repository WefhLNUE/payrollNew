import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// REQ-PY-19, REQ-PY-27-29, BR-24, BR-25, BR-28, BR-56: Signing Bonus Management
@Schema({ timestamps: true })
export class SigningBonus extends Document {
  // Linked to employee and contract from Onboarding
  @Prop({ type: String, ref: 'Employee', required: true })
  employeeId: string; // ref to Employee, required

  @Prop({ type: String, ref: 'Contract', required: true })
  contractId: string; // ref to Contract, required

  // BR-24: Only process if employee contract flags them as eligible
  @Prop({ required: true })
  amount: number; // original amount from contract, required

  @Prop()
  approvedAmount: number; // may differ after review

  @Prop({
    default: 'one-time',
    enum: ['one-time', 'split'],
  })
  bonusType: string;

  @Prop()
  paymentTerms: string; // description of payment terms

  // Created by from Onboarding/HR
  @Prop({ type: String, ref: 'User', required: true })
  createdBy: string; // ref to User - from Onboarding/HR

  // REQ-PY-28: Review and approval workflow (Phase 0 of Payroll Execution)
  // Reviewed by Payroll Specialist
  @Prop({ type: String, ref: 'User' })
  reviewedBy: string; // ref to User - Payroll Specialist per REQ-PY-28

  @Prop()
  reviewedDate: Date;

  // Approved by Payroll Manager
  @Prop({ type: String, ref: 'User' })
  approvedBy: string; // ref to User - Payroll Manager per REQ-PY-28

  @Prop()
  approvedDate: Date;

  // Draft status initially, needs approval before payment
  // BR-28: System must ensure bonus is disbursed only once (check status !== 'paid')
  @Prop({
    default: 'pending',
    enum: ['pending', 'approved', 'rejected', 'paid'],
  })
  status: string;

  @Prop()
  paymentDate: Date;

  @Prop({ type: String, ref: 'PayrollCycle' })
  payrollCycleId: string; // ref to PayrollCycle - which cycle it was paid in

  @Prop()
  rejectionReason: string;

  // BR-25: Manual overrides require authorization (log in editHistory)
  // REQ-PY-29: Payroll Specialist can edit if status is 'pending'
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

export const SigningBonusSchema = SchemaFactory.createForClass(SigningBonus);

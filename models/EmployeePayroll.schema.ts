import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class EmployeePayroll extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employeeId: Types.ObjectId; // reference to employee

  @Prop({ required: true })
  bankAccountNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Paygrade', required: true })
  paygrade: Types.ObjectId; // reference to paygrade

  @Prop({ type: Types.ObjectId, ref: 'PayType', required: true })
  payType: Types.ObjectId; // reference to pay type (hourly, monthly, etc.)

  @Prop([{ type: Types.ObjectId, ref: 'Allowance' }])
  allowances: Types.ObjectId[]; // array of allowances

  @Prop({ type: Types.ObjectId, ref: 'Tax', required: true })
  tax: Types.ObjectId; // reference to tax info

  @Prop({ type: Types.ObjectId, ref: 'InsuranceBracket', required: true })
  insuranceBracket: Types.ObjectId; // reference to insurance bracket
}

export const EmployeePayrollSchema =
  SchemaFactory.createForClass(EmployeePayroll);

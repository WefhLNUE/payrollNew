import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// NFR-33: Security - Role-based access control for payroll configurations and operations
@Schema({ timestamps: true })
export class RoleAccessControl extends Document {
  // Different permissions for Payroll Specialist, Payroll Manager, HR Manager, Finance Staff, Legal Admin, System Admin
  @Prop({
    required: true,
    enum: [
      'payroll_specialist',
      'payroll_manager',
      'hr_manager',
      'finance_staff',
      'legal_admin',
      'system_admin',
      'employee',
    ],
  })
  roleName: string;

  // Control access to different modules
  @Prop({
    payrollConfiguration: { type: Boolean, default: false },
    payrollExecution: { type: Boolean, default: false },
    payrollTracking: { type: Boolean, default: false },
    employeeProfile: { type: Boolean, default: false },
    leaves: { type: Boolean, default: false },
    timeManagement: { type: Boolean, default: false },
    organizationalStructure: { type: Boolean, default: false },
    recruitment: { type: Boolean, default: false },
    onboarding: { type: Boolean, default: false },
    offboarding: { type: Boolean, default: false },
    performance: { type: Boolean, default: false },
  })
  moduleAccess: {
    payrollConfiguration: boolean;
    payrollExecution: boolean;
    payrollTracking: boolean;
    employeeProfile: boolean;
    leaves: boolean;
    timeManagement: boolean;
    organizationalStructure: boolean;
    recruitment: boolean;
    onboarding: boolean;
    offboarding: boolean;
    performance: boolean;
  };

  // Track who can create, view, edit, approve, delete configurations
  @Prop({
    canCreate: { type: Boolean, default: false },
    canView: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canApprove: { type: Boolean, default: false },
    canReject: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
    canFreeze: { type: Boolean, default: false },
    canUnfreeze: { type: Boolean, default: false },
    canGenerateReports: { type: Boolean, default: false },
  })
  permissions: {
    canCreate: boolean;
    canView: boolean;
    canEdit: boolean;
    canApprove: boolean;
    canReject: boolean;
    canDelete: boolean;
    canFreeze: boolean;
    canUnfreeze: boolean;
    canGenerateReports: boolean;
  };

  @Prop([String])
  specificEntities: string[]; // which specific schemas this role can access

  @Prop({
    default: 'self',
    enum: ['all', 'department', 'self'],
  })
  dataScope: string;

  @Prop({ default: true })
  isActive: boolean;

  // Created by System Admin
  @Prop({ type: String, ref: 'User', required: true })
  createdBy: string; // ref to User - System Admin

  @Prop()
  notes: string;
}

export const RoleAccessControlSchema =
  SchemaFactory.createForClass(RoleAccessControl);

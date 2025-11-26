import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { EmployeeProfile } from '../employee-profile/models/employee-profile.schema';
import { EmployeeSystemRole } from '../employee-profile/models/employee-system-role.schema';

type EmployeeDocument = HydratedDocument<EmployeeProfile>;
type RoleDocument = HydratedDocument<EmployeeSystemRole>;

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,

        @InjectModel(EmployeeProfile.name)
        private readonly employeeModel: Model<EmployeeProfile>,

        @InjectModel(EmployeeSystemRole.name)
        private readonly employeeRoleModel: Model<EmployeeSystemRole>,
    ) {}

    //LOGIN → returns JWT
    async login(user: EmployeeDocument & { systemRole: RoleDocument | null }) {

        const payload = {
            sub: user._id.toString(),
            workEmail: user.workEmail,
            roles: user.systemRole?.roles ?? [],
            permissions: user.systemRole?.permissions ?? [],
            primaryDepartmentId: user.primaryDepartmentId,
        };

        return {
        accessToken: this.jwtService.sign(payload),
        };
    }

    //VALIDATE EMPLOYEE LOGIN
    async validateEmployee(workEmail: string, password: string) {
        const employee = await this.employeeModel.findOne({ workEmail }).exec();
        if (!employee) return null;

        const isMatch = await bcrypt.compare(password, employee.password as string);
        if (!isMatch) return null;

        // Load roles
        const systemRole = await this.employeeRoleModel.findOne({
        employeeProfileId: employee._id,
        isActive: true,
        });

        // Return hydrated document + role
        return Object.assign(employee, { systemRole });
    }
}

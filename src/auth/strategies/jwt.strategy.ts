import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {UserProfileBaseSchema} from '../../employee-profile/models/user-schema'
import { InjectModel } from '@nestjs/mongoose';
//import { EmployeeProfile } from 'src/employee-profile/models/employee-profile.schema';
import { EmployeeSystemRole } from 'src/employee-profile/models/employee-system-role.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.accessToken,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string,
        });
    }

    // @InjectModel(EmployeeProfile.name)
    // private readonly employeeModel : Model<EmployeeProfile>;

    @InjectModel(EmployeeSystemRole.name)
    private readonly employeeRoleModel : Model<EmployeeSystemRole>;

    async validate(payload: any) {
        const systemRole = await this.employeeRoleModel
            .findOne({ employeeProfileId: payload.sub }) // 👉 correct query
            .populate('employeeProfileId')               // 👉 correct populate
            .exec();

        if (!systemRole || !systemRole.employeeProfileId) {
            return null;
        }

        const employee = systemRole.employeeProfileId as any;

        return {
            id: employee._id,
            workEmail: employee.workEmail ?? null,
            primaryDepartmentId: employee.primaryDepartmentId ?? null,
            primaryPositionId: employee.primaryPositionId ?? null,
            roles: systemRole.roles,
            permissions: systemRole.permissions,
        };
    }

}

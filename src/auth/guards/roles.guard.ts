import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorator/roles.decorator"; // 👈 FIX

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. Read required roles from metadata (now using ROLES_KEY)
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        // If no roles required → allow access
        if (!requiredRoles) return true;

        // 2. Extract authenticated user from request
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) return false;

        // 3. Extract user roles (from JWT payload)
        const userRoles: string[] = user.roles ?? [];

        // 4. Check ANY intersection
        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
            throw new ForbiddenException("You do not have permission");
        }

        return true;
    }
}

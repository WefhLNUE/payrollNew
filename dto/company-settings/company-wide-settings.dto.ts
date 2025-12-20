import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CompanyWideSettingsDto {
    @IsDateString()
    payDate: string;

    @IsString()
    @IsNotEmpty()
    timeZone: string;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsOptional()
    @IsEnum(ConfigStatus)
    status?: ConfigStatus;
}

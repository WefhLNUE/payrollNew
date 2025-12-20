<<<<<<< HEAD
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CompanyWideSettingsDto {
    @IsDateString()
    payDate: string;

    @IsString()
    @IsNotEmpty()
    timeZone: string;

    @IsString()
    @IsNotEmpty()
    currency: string;
=======
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CompanyWideSettingsDto {
    @IsDateString()
    payDate: string | Date;

    @IsString()
    timeZone: string;

    @IsOptional()
    @IsString()
    currency?: string;

    @IsOptional()
    @IsEnum(ConfigStatus)
    status?: ConfigStatus;
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
}

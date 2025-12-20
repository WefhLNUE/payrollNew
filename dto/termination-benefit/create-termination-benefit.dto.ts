<<<<<<< HEAD
import { IsString, IsNumber, Min, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTerminationBenefitDto {
    @IsString()
    @IsNotEmpty()
=======
import { IsNumber, IsOptional, IsString, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CreateTerminationBenefitDto {
    @IsString()
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    amount: number;

    @IsOptional()
    @IsString()
    terms?: string;
<<<<<<< HEAD
=======

    @IsOptional()
    @IsEnum(ConfigStatus)
    status?: ConfigStatus;

    @IsOptional()
    @IsString()
    createdBy?: string;
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
}

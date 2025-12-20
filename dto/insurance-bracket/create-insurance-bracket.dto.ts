<<<<<<< HEAD
import { IsString, IsNumber, Min, IsNotEmpty, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInsuranceBracketDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
=======
import { IsNumber, IsOptional, IsString, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CreateInsuranceBracketDto {
    @IsString()
    name: string;



    @Type(() => Number)
    @IsNumber()
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
    minSalary: number;

    @Type(() => Number)
    @IsNumber()
<<<<<<< HEAD
    @Min(0)
=======
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
    maxSalary: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(100)
    employeeRate: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(100)
    employerRate: number;
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

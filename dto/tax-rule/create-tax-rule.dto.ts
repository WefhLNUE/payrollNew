<<<<<<< HEAD
import { IsString, IsNumber, Min, IsNotEmpty, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaxRuleDto {
    @IsString()
    @IsNotEmpty()
=======
import { IsNumber, IsOptional, IsString, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CreateTaxRuleDto {
    @IsString()
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
<<<<<<< HEAD
    @Max(100)
    rate: number;
=======
    rate: number;

    @IsOptional()
    @IsEnum(ConfigStatus)
    status?: ConfigStatus;

    @IsOptional()
    @IsString()
    createdBy?: string;
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
}

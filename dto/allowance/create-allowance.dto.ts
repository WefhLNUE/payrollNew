<<<<<<< HEAD
import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAllowanceDto {
    @IsString()
    @IsNotEmpty()
=======
import { IsNumber, IsOptional, IsString, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CreateAllowanceDto {
    @IsString()
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    amount: number;
<<<<<<< HEAD
=======

    @IsOptional()
    @IsString()
    createdBy?: string;

    @IsOptional()
    @IsEnum(ConfigStatus)
    status?: ConfigStatus;
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
}

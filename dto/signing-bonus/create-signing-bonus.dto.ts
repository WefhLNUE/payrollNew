<<<<<<< HEAD
import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSigningBonusDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    amount: number;
=======
import { IsNumber, IsOptional, IsString, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CreateSigningBonusDto {
    @IsString()
    positionName: string;


    @IsOptional()
    @IsEnum(ConfigStatus)
    status?: ConfigStatus;

    @IsOptional()
    @IsString()
    createdBy?: string;
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
}

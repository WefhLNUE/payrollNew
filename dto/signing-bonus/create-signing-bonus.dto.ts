import { IsNumber, IsOptional, IsString, Min, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CreateSigningBonusDto {
    @IsString()
    @IsNotEmpty()
    positionName: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    amount: number;

    @IsOptional()
    @IsEnum(ConfigStatus)
    status?: ConfigStatus;

    @IsOptional()
    @IsString()
    createdBy?: string;
}

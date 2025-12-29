import { IsNumber, IsOptional, IsString, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInsuranceBracketDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minSalary: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
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

    @IsOptional()
    @IsString()
    createdBy?: string;
}

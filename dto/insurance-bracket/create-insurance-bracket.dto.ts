import { IsString, IsNumber, Min, IsNotEmpty, Max } from 'class-validator';
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
}

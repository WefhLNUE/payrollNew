import { IsString, IsNumber, Min, IsNotEmpty, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaxRuleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(100)
    rate: number;
}

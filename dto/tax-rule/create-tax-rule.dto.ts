import { IsNumber, IsOptional, IsString, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaxRuleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string; // (optional)

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(100)
    rate: number;

    @IsOptional()
    @IsString()
    createdBy?: string;
}

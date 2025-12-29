import { IsNumber, IsOptional, IsString, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSigningBonusDto {
    @IsString()
    @IsNotEmpty()
    positionName: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    amount: number;

    @IsOptional()
    @IsString()
    createdBy?: string;
}


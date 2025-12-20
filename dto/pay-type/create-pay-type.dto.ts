import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class CreatePayTypeDto {
  @IsString()
  type: string;

  @Type(() => Number)
  @IsNumber()
  @Min(6000)
  amount: number;

  @IsOptional()
  @IsEnum(ConfigStatus)
  status?: ConfigStatus;
}

// FILE 5: Placeholder - Waiting for content

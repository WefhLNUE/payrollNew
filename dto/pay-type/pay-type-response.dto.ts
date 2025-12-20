import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigStatus } from '../../enums/payroll-configuration-enums';

export class PayTypeResponseDto {
  @IsString()
  _id: string;

  @IsString()
  type: string;

  @Type(() => Number)
  @IsNumber()
  @Min(6000)
  amount: number;

  @IsEnum(ConfigStatus)
  status: ConfigStatus;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  approvedBy?: string;

  @IsOptional()
  @IsString()
  approvedAt?: string;
}

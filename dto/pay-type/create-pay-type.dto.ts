import { Type } from 'class-transformer';
<<<<<<< HEAD
import { IsNumber, IsString, Min } from 'class-validator';
=======
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PayType, ConfigStatus } from '../../enums/payroll-configuration-enums';
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448

export class CreatePayTypeDto {
  @IsString()
  type: string;

  @Type(() => Number)
  @IsNumber()
  @Min(6000)
  amount: number;
<<<<<<< HEAD
=======

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ConfigStatus)
  status?: ConfigStatus;
>>>>>>> 637ea5be382394614a4b3d42e9f5a9289e042448
}

// FILE 5: Placeholder - Waiting for content

import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePayTypeDto {
  @IsString()
  type: string;

  @Type(() => Number)
  @IsNumber()
  @Min(6000)
  amount: number;
}

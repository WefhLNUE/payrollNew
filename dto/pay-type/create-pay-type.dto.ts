import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePayTypeDto {
  @IsString()
  type: string;

  @Type(() => Number)
  @IsNumber()
  @Min(6000)
  amount: number;
}

// FILE 5: Placeholder - Waiting for content

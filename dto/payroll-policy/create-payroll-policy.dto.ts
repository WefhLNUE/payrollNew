import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
  IsNumber,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import {
  PolicyType,
  Applicability,
} from '../../enums/payroll-configuration-enums';

export class RuleDefinitionDto {
  @IsNumber()
  @Min(0)
  percentage: number;

  @IsNumber()
  @Min(0)
  fixedAmount: number;

  @IsNumber()
  @Min(1)
  thresholdAmount: number;
}

export class CreatePayrollPolicyDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  policyName: string;

  @IsEnum(PolicyType)
  @IsNotEmpty()
  policyType: PolicyType;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  effectiveDate: string;

  @ValidateNested()
  @Type(() => RuleDefinitionDto)
  @IsNotEmpty()
  ruleDefinition: RuleDefinitionDto;

  @IsEnum(Applicability)
  @IsNotEmpty()
  applicability: Applicability;
}

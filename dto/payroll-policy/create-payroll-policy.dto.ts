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
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  ValidationArguments,
} from 'class-validator';
import {
  PolicyType,
  Applicability,
} from '../../enums/payroll-configuration-enums';

@ValidatorConstraint({ name: 'atLeastOneField', async: false })
export class AtLeastOneFieldConstraint implements ValidatorConstraintInterface {
  validate(ruleDefinition: RuleDefinitionDto, args: ValidationArguments) {
    if (!ruleDefinition) return false;

    const hasPercentage = ruleDefinition.percentage !== undefined && ruleDefinition.percentage !== null;
    const hasFixedAmount = ruleDefinition.fixedAmount !== undefined && ruleDefinition.fixedAmount !== null;
    const hasThreshold = ruleDefinition.thresholdAmount !== undefined && ruleDefinition.thresholdAmount !== null;

    return hasPercentage || hasFixedAmount || hasThreshold;
  }

  defaultMessage(args: ValidationArguments) {
    return 'ruleDefinition must include at least one value (percentage, fixedAmount, or thresholdAmount)';
  }
}

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
  @Validate(AtLeastOneFieldConstraint)
  ruleDefinition: RuleDefinitionDto;

  @IsEnum(Applicability)
  @IsNotEmpty()
  applicability: Applicability;
}

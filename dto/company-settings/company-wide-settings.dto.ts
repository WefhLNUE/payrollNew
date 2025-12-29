import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CompanyWideSettingsDto {
    @IsDateString()
    payDate: string;

    @IsString()
    @IsNotEmpty()
    timeZone: string;

    @IsString()
    @IsNotEmpty()
    currency: string;
}

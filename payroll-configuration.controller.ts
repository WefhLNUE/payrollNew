import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { SystemRole } from '../employee-profile/enums/employee-profile.enums';

import { ConfigStatus, PolicyType } from './enums/payroll-configuration-enums';
import { PayrollConfigurationService } from './payroll-configuration.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
    CreatePayTypeDto,
    UpdatePayTypeDto,
} from './dto/pay-type';
import {
    CreatePayrollPolicyDto,
    UpdatePayrollPolicyDto,
} from './dto/payroll-policy';
import {
    CreatePayGradeDto,
    UpdatePayGradeDto,
} from './dto/pay-grade';
import {
    ApproveConfigDto,
    RejectConfigDto,
} from './dto/approval.dto';
import { CreateAllowanceDto, UpdateAllowanceDto } from './dto/allowance';
import { CreateSigningBonusDto, UpdateSigningBonusDto } from './dto/signing-bonus';
import { CreateTaxRuleDto, UpdateTaxRuleDto } from './dto/tax-rule';
import { CreateTerminationBenefitDto, UpdateTerminationBenefitDto } from './dto/termination-benefit';
import { CreateInsuranceBracketDto, UpdateInsuranceBracketDto } from './dto/insurance-bracket';
import { CompanyWideSettingsDto } from './dto/company-settings';

@Controller('payroll-configuration')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class PayrollConfigurationController {
    constructor(
        private readonly payrollConfigurationService: PayrollConfigurationService,
    ) { }

    @Get('health')
    healthCheck() {
        return { status: 'ok', message: 'Payroll Configuration API is running' };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Signing Bonus API                            */
    /* -------------------------------------------------------------------------- */

    @Post('signing-bonus')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    createSigningBonus(@Body() dto: CreateSigningBonusDto) {
        return this.payrollConfigurationService.createSigningBonus(dto);
    }


    @Patch('signing-bonus/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    updateSigningBonus(@Param('id') id: string, @Body() dto: UpdateSigningBonusDto) {
        return this.payrollConfigurationService.updateSigningBonus(id, dto);
    }


    @Get('signing-bonus')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    getAllSigningBonus() {
        return this.payrollConfigurationService.getAllSigningBonus();
    }


    @Get('signing-bonus/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    getOneSigningBonus(@Param('id') id: string) {
        return this.payrollConfigurationService.getOneSigningBonus(id);
    }


    @Patch('signing-bonus/:id/status')
    @Roles(SystemRole.PAYROLL_MANAGER)
    approveSigningBonus(
        @Param('id') id: string,
        @Body() body: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.setSigningBonusStatus(id, {
            status: ConfigStatus.APPROVED,
            approverId: body.approvedBy,
        });
    }

    @Delete('signing-bonus/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteSigningBonus(@Param('id') id: string) {
        return this.payrollConfigurationService.deleteSigningBonus(id);
    }



    /* -------------------------------------------------------------------------- */
    /*                               Tax Rules API                                */
    /* -------------------------------------------------------------------------- */

    @Post('tax-rule')
    @Roles(SystemRole.LEGAL_POLICY_ADMIN)
    createTaxRule(@Body() dto: CreateTaxRuleDto) {
        return this.payrollConfigurationService.createTaxRule(dto);
    }

    @Patch('tax-rule/:id')
    @Roles(SystemRole.LEGAL_POLICY_ADMIN)
    updateTaxRule(@Param('id') id: string, @Body() body: UpdateTaxRuleDto) {
        return this.payrollConfigurationService.updateTaxRule(id, body);
    }

    @Get('tax-rule')
    @Roles(SystemRole.LEGAL_POLICY_ADMIN)
    getAllTaxRules() {
        return this.payrollConfigurationService.getAllTaxRules();
    }

    @Get('tax-rule/:id')
    @Roles(SystemRole.LEGAL_POLICY_ADMIN)
    getOneTaxRule(@Param('id') id: string) {
        return this.payrollConfigurationService.getOneTaxRule(id);
    }



    @Patch('tax-rule/:id/status')
    @Roles(SystemRole.LEGAL_POLICY_ADMIN)
    approveTaxRule(
        @Param('id') id: string,
        @Body() body: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.setTaxRuleStatus(id, {
            status: ConfigStatus.APPROVED,
            approverId: body.approvedBy,
        });
    }

    @Delete('tax-rule/:id')
    @Roles(SystemRole.SYSTEM_ADMIN, SystemRole.LEGAL_POLICY_ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTaxRule(@Param('id') id: string) {
        return this.payrollConfigurationService.deleteTaxRule(id);
    }




    /* -------------------------------------------------------------------------- */
    /*                          Termination Benefits API                          */
    /* -------------------------------------------------------------------------- */

    @Post('termination-benefit')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    createTerminationBenefit(@Body() dto: CreateTerminationBenefitDto) {
        return this.payrollConfigurationService.createTerminationBenefit(dto);
    }

    @Patch('termination-benefit/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    updateTerminationBenefit(@Param('id') id: string, @Body() dto: UpdateTerminationBenefitDto) {
        return this.payrollConfigurationService.updateTerminationBenefit(id, dto);
    }


    @Get('termination-benefit')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    getAllTerminationBenefits() {
        return this.payrollConfigurationService.getAllTerminationBenefits();
    }

    @Get('termination-benefit/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    getOneTerminationBenefit(@Param('id') id: string) {
        return this.payrollConfigurationService.getOneTerminationBenefit(id);
    }


    @Patch('termination-benefit/:id/status')
    @Roles(SystemRole.PAYROLL_MANAGER)
    approveTerminationBenefit(
        @Param('id') id: string,
        @Body() body: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.setTerminationBenefitStatus(id, {
            status: ConfigStatus.APPROVED,
            approverId: body.approvedBy,
        });
    }

    @Delete('termination-benefit/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTerminationBenefit(@Param('id') id: string) {
        return this.payrollConfigurationService.deleteTerminationBenefit(id);
    }



    /* -------------------------------------------------------------------------- */
    /*                               Pay Types API                                */
    /* -------------------------------------------------------------------------- */

    @Post('pay-types')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async createPayType(@Body() createDto: CreatePayTypeDto) {
        return this.payrollConfigurationService.createPayType(createDto);
    }


    @Get('pay-types')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async getAllPayTypes(@Query('status') status?: ConfigStatus) {
        return this.payrollConfigurationService.getAllPayTypes(status);
    }


    @Get('pay-types/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async getPayTypeById(@Param('id') id: string) {
        return this.payrollConfigurationService.getPayTypeById(id);
    }


    @Patch('pay-types/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    async updatePayType(
        @Param('id') id: string,
        @Body() updateDto: UpdatePayTypeDto,
    ) {
        return this.payrollConfigurationService.updatePayType(id, updateDto);
    }


    @Delete('pay-types/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePayType(@Param('id') id: string): Promise<void> {
        await this.payrollConfigurationService.deletePayType(id);
    }

    @Post('pay-types/:id/approve')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.OK)
    async approvePayType(
        @Param('id') id: string,
        @Body() approveDto: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.approvePayType(
            id,
            approveDto.approvedBy,
        );
    }

    @Post('pay-types/:id/reject')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.OK)
    async rejectPayType(
        @Param('id') id: string,
        @Body() rejectDto: RejectConfigDto,
    ) {
        return this.payrollConfigurationService.rejectPayType(
            id,
            rejectDto.rejectedBy,
            rejectDto.reason,
        );
    }


    /* -------------------------------------------------------------------------- */
    /*                            Payroll Policies API                            */
    /* -------------------------------------------------------------------------- */

    @Post('payroll-policies')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async createPayrollPolicy(@Body() createDto: CreatePayrollPolicyDto) {
        return this.payrollConfigurationService.createPayrollPolicy(createDto);
    }


    @Get('payroll-policies')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async getAllPayrollPolicies(
        @Query('policyType') policyType?: PolicyType,
        @Query('status') status?: ConfigStatus,
    ) {
        return this.payrollConfigurationService.getAllPayrollPolicies(
            policyType,
            status,
        );
    }


    @Get('payroll-policies/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async getPayrollPolicyById(@Param('id') id: string) {
        return this.payrollConfigurationService.getPayrollPolicyById(id);
    }

    @Patch('payroll-policies/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async updatePayrollPolicy(
        @Param('id') id: string,
        @Body() updateDto: UpdatePayrollPolicyDto,
    ) {
        return this.payrollConfigurationService.updatePayrollPolicy(id, updateDto);
    }


    @Delete('payroll-policies/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePayrollPolicy(@Param('id') id: string): Promise<void> {
        await this.payrollConfigurationService.deletePayrollPolicy(id);
    }

    @Post('payroll-policies/:id/approve')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.OK)
    async approvePayrollPolicy(
        @Param('id') id: string,
        @Body() approveDto: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.approvePayrollPolicy(
            id,
            approveDto.approvedBy,
        );
    }

    @Post('payroll-policies/:id/reject')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.OK)
    async rejectPayrollPolicy(
        @Param('id') id: string,
        @Body() rejectDto: RejectConfigDto,
    ) {
        return this.payrollConfigurationService.rejectPayrollPolicy(
            id,
            rejectDto.rejectedBy,
            rejectDto.reason,
        );
    }


    /* -------------------------------------------------------------------------- */
    /*                               Pay Grades API                               */
    /* -------------------------------------------------------------------------- */

    @Post('pay-grades')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async createPayGrade(@Body() createDto: CreatePayGradeDto) {
        return this.payrollConfigurationService.createPayGrade(createDto);
    }


    @Get('pay-grades')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async getAllPayGrades(@Query('status') status?: ConfigStatus) {
        return this.payrollConfigurationService.getAllPayGrades(status);
    }


    @Get('pay-grades/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    async getPayGradeById(@Param('id') id: string) {
        return this.payrollConfigurationService.getPayGradeById(id);
    }

    @Patch('pay-grades/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    async updatePayGrade(
        @Param('id') id: string,
        @Body() updateDto: UpdatePayGradeDto,
    ) {
        return this.payrollConfigurationService.updatePayGrade(id, updateDto);
    }


    @Delete('pay-grades/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePayGrade(@Param('id') id: string): Promise<void> {
        await this.payrollConfigurationService.deletePayGrade(id);
    }

    @Post('pay-grades/:id/approve')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.OK)
    async approvePayGrade(
        @Param('id') id: string,
        @Body() approveDto: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.approvePayGrade(
            id,
            approveDto.approvedBy,
        );
    }

    @Post('pay-grades/:id/reject')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.OK)
    async rejectPayGrade(
        @Param('id') id: string,
        @Body() rejectDto: RejectConfigDto,
    ) {
        return this.payrollConfigurationService.rejectPayGrade(
            id,
            rejectDto.rejectedBy,
            rejectDto.reason,
        );
    }


    /* -------------------------------------------------------------------------- */
    /*                               Allowances API                               */
    /* -------------------------------------------------------------------------- */

    @Post('allowances')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER)
    createAllowance(@Body() body: CreateAllowanceDto) {
        return this.payrollConfigurationService.createAllowance(body);
    }


    @Get('allowances')
    @Roles(SystemRole.PAYROLL_MANAGER)
    listAllowances(@Query('status') status?: ConfigStatus) {
        return this.payrollConfigurationService.listAllowances(status);
    }


    @Get('allowances/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    getAllowance(@Param('id') id: string) {
        return this.payrollConfigurationService.getAllowance(id);
    }

    @Patch('allowances/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    updateAllowance(
        @Param('id') id: string,
        @Body() body: UpdateAllowanceDto,
    ) {
        return this.payrollConfigurationService.updateAllowance(
            id,
            body,
        );
    }


    @Patch('allowances/:id/status')
    @Roles(SystemRole.PAYROLL_MANAGER)
    approveAllowance(
        @Param('id') id: string,
        @Body() body: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.setAllowanceStatus(
            id,
            { status: ConfigStatus.APPROVED, approverId: body.approvedBy },
        );
    }


    @Delete('allowances/:id')
    @Roles(SystemRole.PAYROLL_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAllowance(@Param('id') id: string) {
        return this.payrollConfigurationService.deleteAllowance(id);
    }


    /* -------------------------------------------------------------------------- */
    /*                          Company-wide settings API                         */
    /* -------------------------------------------------------------------------- */

    @Post('company-settings')
    upsertCompanySettings(@Body() body: CompanyWideSettingsDto) {
        return this.payrollConfigurationService.upsertCompanyWideSettings(body as any);
    }

    @Get('company-settings')
    getCompanySettings() {
        return this.payrollConfigurationService.getCompanyWideSettings();
    }

    @Patch('company-settings/:id')
    updateCompanySettings(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() body: CompanyWideSettingsDto,
    ) {
        return this.payrollConfigurationService.updateCompanyWideSettings(
            id.toString(),
            body as any,
        );
    }

    /* -------------------------------------------------------------------------- */
    /*                           Insurance brackets API                           */
    /* -------------------------------------------------------------------------- */

    @Post('insurance-brackets')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER, SystemRole.HR_MANAGER)
    createInsurance(@Body() body: CreateInsuranceBracketDto) {
        return this.payrollConfigurationService.createInsuranceBracket(body);
    }


    @Get('insurance-brackets')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.HR_MANAGER)
    listInsurance(@Query('status') status?: ConfigStatus) {
        return this.payrollConfigurationService.listInsuranceBrackets(status);
    }


    @Get('insurance-brackets/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.HR_MANAGER)
    getInsurance(@Param('id') id: string) {
        return this.payrollConfigurationService.getInsuranceBracket(id);
    }

    @Patch('insurance-brackets/:id')
    @Roles(SystemRole.PAYROLL_SPECIALIST, SystemRole.PAYROLL_MANAGER, SystemRole.HR_MANAGER)
    updateInsurance(
        @Param('id') id: string,
        @Body() body: UpdateInsuranceBracketDto,
    ) {
        return this.payrollConfigurationService.updateInsuranceBracket(
            id,
            body,
        );
    }


    @Patch('insurance-brackets/:id/status')
    @Roles(SystemRole.HR_MANAGER)
    approveInsurance(
        @Param('id') id: string,
        @Body() body: ApproveConfigDto,
    ) {
        return this.payrollConfigurationService.setInsuranceBracketStatus(
            id,
            { status: ConfigStatus.APPROVED, approverId: body.approvedBy },
        );
    }


    @Delete('insurance-brackets/:id')
    @Roles(SystemRole.PAYROLL_MANAGER, SystemRole.HR_MANAGER)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteInsurance(@Param('id') id: string) {
        return this.payrollConfigurationService.deleteInsuranceBracket(
            id,
        );
    }

    @Get('export')
    @Roles(SystemRole.PAYROLL_MANAGER)
    async exportConfiguration() {
        return this.payrollConfigurationService.exportConfiguration();
    }

}

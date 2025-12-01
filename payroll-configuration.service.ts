import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigStatus } from './enums/payroll-configuration-enums';

import { signingBonus } from './Models/SigningBonus.schema';
import { taxRules } from './Models/taxRules.schema';
import { terminationAndResignationBenefits } from './Models/terminationAndResignationBenefits';

@Injectable()
export class PayrollConfigurationService {
    constructor(
        @InjectModel(signingBonus.name)
        private signingBonusModel: mongoose.Model<signingBonus>,

        @InjectModel(taxRules.name)
        private taxRulesModel: mongoose.Model<taxRules>,

        @InjectModel(terminationAndResignationBenefits.name)
        private termModel: mongoose.Model<terminationAndResignationBenefits>,
    ) { }

    // ------- Signing Bonus -------
    async createSigningBonus(dto: any) {
        dto.status = ConfigStatus.DRAFT;
        return this.signingBonusModel.create(dto);
    }

    async updateSigningBonus(id: string, dto: any) {
        const doc = await this.signingBonusModel.findById(id);
        if (!doc) throw new BadRequestException('Not found');
        if (doc.status !== ConfigStatus.DRAFT)
            throw new BadRequestException('Cannot edit non-draft configuration');

        return this.signingBonusModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async getAllSigningBonus() {
        return this.signingBonusModel.find();
    }

    async getOneSigningBonus(id: string) {
        return this.signingBonusModel.findById(id);
    }

    // ------- Tax Rules -------
    async createTaxRule(dto: any) {
        dto.status = ConfigStatus.DRAFT;
        return this.taxRulesModel.create(dto);
    }

    async updateTaxRule(id: string, dto: any) {
        const doc = await this.taxRulesModel.findById(id);
        if (!doc) throw new BadRequestException('Not found');
        if (doc.status !== ConfigStatus.DRAFT)
            throw new BadRequestException('Cannot edit non-draft configuration');

        return this.taxRulesModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async getAllTaxRules() {
        return this.taxRulesModel.find();
    }

    async getOneTaxRule(id: string) {
        return this.taxRulesModel.findById(id);
    }

    // ------- Termination Benefits -------
    async createTerminationBenefit(dto: any) {
        dto.status = ConfigStatus.DRAFT;
        return this.termModel.create(dto);
    }

    async updateTerminationBenefit(id: string, dto: any) {
        const doc = await this.termModel.findById(id);
        if (!doc) throw new BadRequestException('Not found');
        if (doc.status !== ConfigStatus.DRAFT)
            throw new BadRequestException('Cannot edit non-draft configuration');

        return this.termModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async getAllTerminationBenefits() {
        return this.termModel.find();
    }

    async getOneTerminationBenefit(id: string) {
        return this.termModel.findById(id);
    }
}

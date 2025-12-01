import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigStatus } from './enums/payroll-configuration-enums';

// Schemas types (these names match your schema classes)
import { signingBonus as SigningBonusDoc } from './Models/SigningBonus.schema';
import { taxRules as TaxRulesDoc } from './Models/taxRules.schema';
import { terminationAndResignationBenefits as TermBenefitDoc } from './Models/terminationAndResignationBenefits';

@Injectable()
export class PayrollConfigurationService {
    constructor(
        @InjectModel('signingBonus') private signingBonusModel: Model<SigningBonusDoc>,
        @InjectModel('taxRules') private taxRulesModel: Model<TaxRulesDoc>,
        @InjectModel('terminationAndResignationBenefits') private termBenefitModel: Model<TermBenefitDoc>,
    ) { }

    /** -------------------------
     * Signing Bonus operations
     * ------------------------- */
    async createSigningBonus(dto: { positionName: string; amount: number; createdBy?: string }) {
        const exists = await this.signingBonusModel.findOne({ positionName: dto.positionName });
        if (exists) throw new BadRequestException('Signing bonus with this positionName already exists');
        const doc = await this.signingBonusModel.create({
            positionName: dto.positionName,
            amount: dto.amount,
            status: ConfigStatus.DRAFT,
            createdBy: dto.createdBy ? new Types.ObjectId(dto.createdBy) : undefined,
        });

        await this._audit('CREATE', 'SigningBonus', doc._id, `Created signing bonus for ${dto.positionName}`, dto.createdBy);
        return doc;
    }

    async getAllSigningBonuses() {
        return this.signingBonusModel.find().lean();
    }

    async getSigningBonusById(id: string) {
        const doc = await this.signingBonusModel.findById(id);
        if (!doc) throw new NotFoundException('Signing bonus not found');
        return doc;
    }

    async updateSigningBonus(id: string, dto: { amount?: number; positionName?: string; updaterId?: string }) {
        const doc = await this.signingBonusModel.findById(id);
        if (!doc) throw new NotFoundException('Signing bonus not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new ForbiddenException('Only DRAFT signing bonuses can be edited');
        if (dto.positionName) doc.positionName = dto.positionName;
        if (typeof dto.amount === 'number') doc.amount = dto.amount;
        await doc.save();
        await this._audit('UPDATE', 'SigningBonus', doc._id, `Updated signing bonus ${id}`, dto.updaterId);
        return doc;
    }

    async deleteSigningBonus(id: string, deleterId?: string) {
        const doc = await this.signingBonusModel.findById(id);
        if (!doc) throw new NotFoundException('Signing bonus not found');
        // allow delete regardless of status per requirement (manager can delete after approval to create new)
        await this.signingBonusModel.deleteOne({ _id: id });
        await this._audit('DELETE', 'SigningBonus', new Types.ObjectId(id), 'Deleted signing bonus', deleterId);
        return { deleted: true };
    }

    async approveSigningBonus(id: string, approverId: string) {
        const doc = await this.signingBonusModel.findById(id);
        if (!doc) throw new NotFoundException('Signing bonus not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new BadRequestException('Only DRAFT signing bonuses can be approved');
        doc.status = ConfigStatus.APPROVED;
        doc.approvedBy = new Types.ObjectId(approverId);
        doc.approvedAt = new Date();
        await doc.save();
        await this._audit('APPROVE', 'SigningBonus', doc._id, `Approved signing bonus ${id}`, approverId);
        return doc;
    }

    async rejectSigningBonus(id: string, approverId: string, reason?: string) {
        const doc = await this.signingBonusModel.findById(id);
        if (!doc) throw new NotFoundException('Signing bonus not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new BadRequestException('Only DRAFT signing bonuses can be rejected');
        doc.status = ConfigStatus.REJECTED;
        doc.approvedBy = new Types.ObjectId(approverId);
        doc.approvedAt = new Date();
        await doc.save();
        await this._audit('REJECT', 'SigningBonus', doc._id, `Rejected signing bonus: ${reason || ''}`, approverId);
        return doc;
    }

    /** -------------------------
     * Tax rules operations
     * ------------------------- */
    async createTaxRule(dto: { name: string; description?: string; rate: number; createdBy?: string }) {
        const exists = await this.taxRulesModel.findOne({ name: dto.name });
        if (exists) throw new BadRequestException('Tax rule with this name already exists');
        const doc = await this.taxRulesModel.create({
            name: dto.name,
            description: dto.description,
            rate: dto.rate,
            status: ConfigStatus.DRAFT,
            createdBy: dto.createdBy ? new Types.ObjectId(dto.createdBy) : undefined,
        });
        await this._audit('CREATE', 'TaxRule', doc._id, `Created tax rule ${dto.name}`, dto.createdBy);
        return doc;
    }

    async getAllTaxRules() {
        return this.taxRulesModel.find().lean();
    }

    async getTaxRuleById(id: string) {
        const doc = await this.taxRulesModel.findById(id);
        if (!doc) throw new NotFoundException('Tax rule not found');
        return doc;
    }

    // Tax rules editing allowed only in DRAFT (per requirement)
    async updateTaxRule(id: string, dto: { rate?: number; description?: string; name?: string; updaterId?: string }) {
        const doc = await this.taxRulesModel.findById(id);
        if (!doc) throw new NotFoundException('Tax rule not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new ForbiddenException('Only DRAFT tax rules can be edited');
        if (dto.name) doc.name = dto.name;
        if (dto.description) doc.description = dto.description;
        if (typeof dto.rate === 'number') doc.rate = dto.rate;
        await doc.save();
        await this._audit('UPDATE', 'TaxRule', doc._id, `Updated tax rule ${id}`, dto.updaterId);
        return doc;
    }

    async approveTaxRule(id: string, approverId: string) {
        const doc = await this.taxRulesModel.findById(id);
        if (!doc) throw new NotFoundException('Tax rule not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new BadRequestException('Only DRAFT tax rules can be approved');
        doc.status = ConfigStatus.APPROVED;
        doc.approvedBy = new Types.ObjectId(approverId);
        doc.approvedAt = new Date();
        await doc.save();
        await this._audit('APPROVE', 'TaxRule', doc._id, `Approved tax rule ${id}`, approverId);
        return doc;
    }

    async rejectTaxRule(id: string, approverId: string, reason?: string) {
        const doc = await this.taxRulesModel.findById(id);
        if (!doc) throw new NotFoundException('Tax rule not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new BadRequestException('Only DRAFT tax rules can be rejected');
        doc.status = ConfigStatus.REJECTED;
        doc.approvedBy = new Types.ObjectId(approverId);
        doc.approvedAt = new Date();
        await doc.save();
        return doc;
    }

    /** -------------------------
     * Termination & Resignation Benefits
     * ------------------------- */
    async createTerminationBenefit(dto: { name: string; amount: number; terms?: string; createdBy?: string }) {
        const exists = await this.termBenefitModel.findOne({ name: dto.name });
        if (exists) throw new BadRequestException('Termination/Resignation benefit with this name already exists');
        const doc = await this.termBenefitModel.create({
            name: dto.name,
            amount: dto.amount,
            terms: dto.terms,
            status: ConfigStatus.DRAFT,
            createdBy: dto.createdBy ? new Types.ObjectId(dto.createdBy) : undefined,
        });
        return doc;
    }

    async getAllTerminationBenefits() {
        return this.termBenefitModel.find().lean();
    }

    async getTerminationBenefitById(id: string) {
        const doc = await this.termBenefitModel.findById(id);
        if (!doc) throw new NotFoundException('Termination benefit not found');
        return doc;
    }

    async updateTerminationBenefit(id: string, dto: { amount?: number; terms?: string; name?: string; updaterId?: string }) {
        const doc = await this.termBenefitModel.findById(id);
        if (!doc) throw new NotFoundException('Termination benefit not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new ForbiddenException('Only DRAFT termination benefits can be edited');
        if (dto.name) doc.name = dto.name;
        if (typeof dto.amount === 'number') doc.amount = dto.amount;
        if (dto.terms) doc.terms = dto.terms;
        await doc.save();
        return doc;
    }

    async approveTerminationBenefit(id: string, approverId: string) {
        const doc = await this.termBenefitModel.findById(id);
        if (!doc) throw new NotFoundException('Termination benefit not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new BadRequestException('Only DRAFT termination benefits can be approved');
        doc.status = ConfigStatus.APPROVED;
        doc.approvedBy = new Types.ObjectId(approverId);
        doc.approvedAt = new Date();
        await doc.save();
        return doc;
    }

    async rejectTerminationBenefit(id: string, approverId: string, reason?: string) {
        const doc = await this.termBenefitModel.findById(id);
        if (!doc) throw new NotFoundException('Termination benefit not found');
        if (doc.status !== ConfigStatus.DRAFT) throw new BadRequestException('Only DRAFT termination benefits can be rejected');
        doc.status = ConfigStatus.REJECTED;
        doc.approvedBy = new Types.ObjectId(approverId);
        doc.approvedAt = new Date();
        await doc.save();
        return doc;

    }




}

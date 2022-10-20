import { AccountContact, AuthenticatedUser, Opportunity, RecommendedReference } from '@shared/models';

import { CreateOpportunityType } from '@modules/opportunity/types';
import { CreateOpportunityWithSelectedReferencesType } from '@modules/account/types';

export class OpportunityService {
  static async create(data: CreateOpportunityType): Promise<Opportunity> {
    return await Opportunity.create(data);
  }

  static async createWithSelectedReferences(data: CreateOpportunityWithSelectedReferencesType): Promise<Opportunity> {
    const opportunity = Opportunity.create(
      {
        accountContactId: data.accountContactId,
        accountId: data.accountId,
        ownerId: data.ownerId,
        recommendedReferences: data.selectedReferences,
      },
      {
        include: RecommendedReference,
      },
    );

    return opportunity;
  }

  static async getWithRecommendedReferences(opportunityId: string, limit: number): Promise<Opportunity> {
    return await Opportunity.findOne({
      where: { opportunityId },
      include: [
        {
          model: RecommendedReference,
          limit,
          include: [
            {
              model: AccountContact,
              include: [
                {
                  model: AuthenticatedUser,
                },
              ],
            },
          ],
        },
      ],
    });
  }

  static async delete(id: string): Promise<number> {
    return await Opportunity.destroy({ where: { id } });
  }

  static async getById(opportunityId: string): Promise<Opportunity> {
    return await Opportunity.findOne({ where: { opportunityId } });
  }

  static async update(data): Promise<Opportunity> {
    const opportunity = await this.getById(data.id);

    opportunity.description = data.description ?? opportunity.description;
    opportunity.dollarValue = data.dollarValue ?? opportunity.dollarValue;

    return await opportunity.save();
  }
}

import { RecommendedReference } from '@shared/models';

export class RecommendedReferenceService {
  static async create(data) {
    return RecommendedReference.create(data);
  }
}

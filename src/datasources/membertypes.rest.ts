import { CommonAPI } from './common.rest';
import type { MemberTypeEntity } from '../utils/DB/entities/DBMemberTypes';

export class MemberTypesAPI extends CommonAPI {
  async getMemberTypes(): Promise<MemberTypeEntity[]> {
    return this.get<MemberTypeEntity[]>(`member-types/`);
  }

  async getMemberType(id: string): Promise<MemberTypeEntity> {
    return this.get<MemberTypeEntity>(`member-types/${encodeURIComponent(id)}`);
  }

  /*
  async getMostViewedMovies(limit = '10'): Promise<Movie[]> {
    const data = await this.get('movies', {
      params: {
        per_page: limit,

        order_by: 'most_viewed',
      },
    });
    return data.results;
  }
  */
}

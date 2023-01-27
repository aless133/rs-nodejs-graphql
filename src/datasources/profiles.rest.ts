import { CommonAPI } from './common.rest';
import type { ProfileEntity } from '../utils/DB/entities/DBProfiles';
import type { MemberTypeEntity } from '../utils/DB/entities/DBMemberTypes';

export class ProfilesAPI extends CommonAPI {
  async getProfiles(): Promise<ProfileEntity[]> {
    return this.get<ProfileEntity[]>(`profiles/`);
  }

  async getProfile(id: string): Promise<ProfileEntity> {
    return this.get<ProfileEntity>(`profiles/${encodeURIComponent(id)}`);
  }

  async getMemberType(id: string): Promise<MemberTypeEntity> {
    return this.get<MemberTypeEntity>(`profiles/${encodeURIComponent(id)}/member-type`);
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

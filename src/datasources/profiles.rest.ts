import { CommonAPI } from './common.rest';
import type { ProfileEntity } from '../utils/DB/entities/DBProfiles';
// import type { MemberTypeEntity } from '../utils/DB/entities/DBMemberTypes';

export class ProfilesAPI extends CommonAPI {
  async getProfiles(): Promise<ProfileEntity[]> {
    return this.get<ProfileEntity[]>(`profiles/`);
  }

  async getProfile(id: string): Promise<ProfileEntity> {
    return this.get<ProfileEntity>(`profiles/${encodeURIComponent(id)}`);
  }

  async createProfile(input: Omit<ProfileEntity, 'id'>): Promise<ProfileEntity> {
    return this.post<ProfileEntity>(`profiles`,{ body: input });
  }
  async updateProfile(id: string, input: Partial<Omit<ProfileEntity, 'id' | 'userId'>>): Promise<ProfileEntity> {
    return this.patch<ProfileEntity>(`profiles/${encodeURIComponent(id)}`,{ body: input });
  }  

}

import { CommonAPI } from './common.rest';
import type { MemberTypeEntity } from '../utils/DB/entities/DBMemberTypes';
import DataLoader from 'dataloader';

export class MemberTypesAPI extends CommonAPI {
  async getMemberTypes(): Promise<MemberTypeEntity[]> {
    return this.get<MemberTypeEntity[]>(`member-types/`);
  }

  private memberTypesLoader = new DataLoader(async (ids) => {
    const memberTypesList = await this.post(`member-types/byids`, { body: { ids } });
    return ids.map((id) => memberTypesList.find((memberType: MemberTypeEntity) => memberType.id === id));
  });

  async getMemberType(id: string): Promise<MemberTypeEntity> {
    return this.memberTypesLoader.load(id);
  }
}

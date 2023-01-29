import { RESTDataSource } from '@apollo/datasource-rest';

import { UserEntity } from '../utils/DB/entities/DBUsers';
export type CreateUserDTO = Omit<UserEntity, 'id' | 'subscribedToUserIds'>;
export type ChangeUserDTO = Partial<Omit<UserEntity, 'id' | 'subscribedToUserIds'>>;

import { ProfileEntity } from '../utils/DB/entities/DBProfiles';
export type CreateProfileDTO = Omit<ProfileEntity, 'id'>;
export type ChangeProfileDTO = Partial<Omit<ProfileEntity, 'id' | 'userId'>>;


export class CommonAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/';
}

import { CommonAPI } from './common.rest';
import type { UserEntity } from '../utils/DB/entities/DBUsers';
import type { ProfileEntity } from '../utils/DB/entities/DBProfiles';
import type { PostEntity } from '../utils/DB/entities/DBPosts';

export class UsersAPI extends CommonAPI {
  async getUsers(): Promise<UserEntity[]> {
    return this.get<UserEntity[]>(`users/`);
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.get<UserEntity>(`users/${encodeURIComponent(id)}`);
  }
  async createUser(input: Omit<UserEntity, 'id' | 'subscribedToUserIds'>): Promise<UserEntity> {
    return this.post<UserEntity>(`users`,{ body: input });
  }
  async updateUser(id: string, input: Omit<UserEntity, 'id' | 'subscribedToUserIds'>): Promise<UserEntity> {
    return this.patch<UserEntity>(`users/${encodeURIComponent(id)}`,{ body: input });
  }
  async getProfile(id: string): Promise<ProfileEntity> {
    return this.get<ProfileEntity>(`users/${encodeURIComponent(id)}/profile`);
  } 

  async getPosts(id: string): Promise<PostEntity[]> {
    return this.get<PostEntity[]>(`users/${encodeURIComponent(id)}/posts`);
  }    

  async getFollowing(id: string): Promise<ProfileEntity> {
    return this.get<ProfileEntity>(`users/${encodeURIComponent(id)}/following`);
  } 

  async getFollowers(id: string): Promise<PostEntity[]> {
    return this.get<PostEntity[]>(`users/${encodeURIComponent(id)}/followers`);
  }    

}

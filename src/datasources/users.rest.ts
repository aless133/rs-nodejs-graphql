import { CommonAPI } from './common.rest';
import type { UserEntity } from '../utils/DB/entities/DBUsers';
import type { ProfileEntity } from '../utils/DB/entities/DBProfiles';
import type { PostEntity } from '../utils/DB/entities/DBPosts';
import DataLoader from 'dataloader';

export class UsersAPI extends CommonAPI {
  async getUsers(): Promise<UserEntity[]> {
    return this.get<UserEntity[]>(`users/`);
  }

  private usersLoader = new DataLoader(async (ids) => {
    const usersList = await this.post(`users/byids`, { body: { ids } });
    return ids.map((id) => usersList.find((user: UserEntity) => user.id === id));
  });

  async getUsersByIds(ids: string[]): Promise<UserEntity[]> {
    return this.usersLoader.loadMany(ids);
  }  

  async getUser(id: string): Promise<UserEntity> {
    return this.usersLoader.load(id);
  }

  private profilesLoader = new DataLoader(async (ids) => {
    const profilesList = await this.post(`profiles/byuserids`, { body: { ids } });
    return ids.map((id) => profilesList.find((profile: ProfileEntity) => profile.userId === id));
  });

  async getProfile(id: string): Promise<ProfileEntity> {
    return this.profilesLoader.load(id);
  }

  private postsLoader = new DataLoader(async (ids) => {
    const postsList = await this.post(`posts/byuserids`, { body: { ids } });
    return ids.map((id) => postsList.filter((post: PostEntity) => post.userId === id));
  });

  async getPosts(id: string): Promise<PostEntity[]> {
    return this.postsLoader.load(id);
  }

  async getFollowing(id: string): Promise<ProfileEntity> {
    return this.get<ProfileEntity>(`users/${encodeURIComponent(id)}/following`);
  }

  async createUser(input: Omit<UserEntity, 'id' | 'subscribedToUserIds'>): Promise<UserEntity> {
    return this.post<UserEntity>(`users`, { body: input });
  }
  async updateUser(id: string, input: Partial<Omit<UserEntity, 'id' | 'subscribedToUserIds'>>): Promise<UserEntity> {
    return this.patch<UserEntity>(`users/${encodeURIComponent(id)}`, { body: input });
  }

}

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

  async getProfile(id: string): Promise<ProfileEntity> {
    return this.get<ProfileEntity>(`users/${encodeURIComponent(id)}/profile`);
  } 

  async getPosts(id: string): Promise<PostEntity[]> {
    return this.get<PostEntity[]>(`users/${encodeURIComponent(id)}/posts`);
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

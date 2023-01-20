import { CommonAPI } from './common.rest';
import type { UserEntity } from '../utils/DB/entities/DBUsers';

export class UsersAPI extends CommonAPI {
  async getUsers(): Promise<UserEntity[]> {
    return this.get<UserEntity[]>(`users/`);
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.get<UserEntity>(`users/${encodeURIComponent(id)}`);
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

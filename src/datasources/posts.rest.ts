import { CommonAPI } from './common.rest';
import type { PostEntity } from '../utils/DB/entities/DBPosts';

export class PostsAPI extends CommonAPI {
  async getPosts(): Promise<PostEntity[]> {
    return this.get<PostEntity[]>(`posts/`);
  }

  async getPost(id: string): Promise<PostEntity> {
    return this.get<PostEntity>(`posts/${encodeURIComponent(id)}`);
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

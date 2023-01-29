import { CommonAPI, CreatePostDTO, ChangePostDTO } from './common.rest';
import type { PostEntity } from '../utils/DB/entities/DBPosts';

export class PostsAPI extends CommonAPI {
  async getPosts(): Promise<PostEntity[]> {
    return this.get<PostEntity[]>(`posts/`);
  }

  async getPost(id: string): Promise<PostEntity> {
    return this.get<PostEntity>(`posts/${encodeURIComponent(id)}`);
  }

  async createPost(input: CreatePostDTO): Promise<PostEntity> {
    return this.post<PostEntity>(`posts`, { body: input });
  }
  
  async updatePost(id: string, input: ChangePostDTO): Promise<PostEntity> {
    return this.patch<PostEntity>(`posts/${encodeURIComponent(id)}`, { body: input });
  }  
}

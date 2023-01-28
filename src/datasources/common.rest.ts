import { RESTDataSource } from '@apollo/datasource-rest';

export class CommonAPI extends RESTDataSource {
  override baseURL = 'http://localhost:3000/';
}

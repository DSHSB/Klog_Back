import { User } from '../entities/user.entitiy';

export interface InfLoginResponse {
  user: User;
  token: string;
}

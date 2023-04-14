import { Request } from 'express';
import { User } from 'src/@core/domain/entities/user/user.entity';

export interface AuthRequest extends Request {
  user: User;
}

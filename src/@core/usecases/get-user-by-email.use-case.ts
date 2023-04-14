import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { Either, left, right } from '../shared/either';
import { UserNotFoundError } from './errors/user-not-found.error';

export class GetUserByEmailUseCase {
  constructor(private readonly userRepo: UserRepositoryInterface) {}

  async execute(email: string): Promise<Either<UserNotFoundError, UserOutput>> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) return left(new UserNotFoundError());

    return right(user.toJSON());
  }
}

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
};

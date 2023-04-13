import { InvalidEmailError } from '../domain/entities/email/emai.errors';
import { User } from '../domain/entities/user/user.entity';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { Either, left, right } from '../shared/either';

import crypto from 'crypto';

export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepositoryInterface) {}

  async execute(
    input: CreateUserInput,
  ): Promise<Either<InvalidEmailError, CreateUserOutput>> {
    const uuid = crypto.randomUUID();

    const user = User.create(input, uuid);
    if (user.isLeft()) return left(user.value);

    await this.userRepo.save(user.value);

    return right(user.value.toJSON());
  }
}

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
};

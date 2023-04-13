import { InvalidEmailError } from '../domain/entities/email/emai.errors';
import { User } from '../domain/entities/user/user.entity';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';
import { Either, left, right } from '../shared/either';
import { PasswordHashing } from '../domain/interfaces/password-hashing.interface';

import crypto from 'crypto';

export class CreateUserUseCase {
  constructor(
    private readonly userRepo: UserRepositoryInterface,
    private readonly passwordHashing: PasswordHashing,
  ) {}

  async execute(
    input: CreateUserInput,
  ): Promise<Either<InvalidEmailError, CreateUserOutput>> {
    const uuid = crypto.randomUUID();

    const user = User.create(input, uuid);
    if (user.isLeft()) return left(user.value);

    await this.userRepo.save(user.value);

    user.value.props.password = await this.passwordHashing.hash(
      user.value.props.password,
    );

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
  password: string;
};

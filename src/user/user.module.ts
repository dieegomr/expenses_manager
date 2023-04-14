import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserInMemoryRepository } from 'src/@core/infra/user-in-memory.repository';
import { CreateUserUseCase } from 'src/@core/usecases/create-user.use-case';
import { UserRepositoryInterface } from 'src/@core/domain/repositories/user.repository';
import { PasswordHashing } from 'src/@core/domain/interfaces/password-hashing.interface';
import { BcryptPasswordHashing } from 'src/@core/infra/bcrypt/bcrypt-password-hashing';
import { JwtTokenGenerator } from 'src/@core/infra/JWT/jwt-token-generator';
import { GetUserByEmailUseCase } from 'src/@core/usecases/get-user-by-email.use-case';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserInMemoryRepository,
      useClass: UserInMemoryRepository,
    },
    {
      provide: BcryptPasswordHashing,
      useClass: BcryptPasswordHashing,
    },
    {
      provide: GetUserByEmailUseCase,
      useClass: GetUserByEmailUseCase,
    },
    {
      provide: JwtTokenGenerator,
      useClass: JwtTokenGenerator,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepo: UserRepositoryInterface,
        passwordHashing: PasswordHashing,
      ) => {
        return new CreateUserUseCase(userRepo, passwordHashing);
      },
      inject: [UserInMemoryRepository, BcryptPasswordHashing],
    },
    {
      provide: GetUserByEmailUseCase,
      useFactory: (userRepo: UserRepositoryInterface) => {
        return new GetUserByEmailUseCase(userRepo);
      },
      inject: [UserInMemoryRepository],
    },
  ],
  exports: [GetUserByEmailUseCase],
})
export class UserModule {}

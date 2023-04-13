import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserInMemoryRepository } from 'src/@core/infra/user-in-memory.repository';
import { CreateUserUseCase } from 'src/@core/usecases/create-user.use-case';
import { UserRepositoryInterface } from 'src/@core/domain/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserInMemoryRepository,
      useClass: UserInMemoryRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface) => {
        return new CreateUserUseCase(userRepo);
      },
      inject: [UserInMemoryRepository],
    },
  ],
})
export class UserModule {}

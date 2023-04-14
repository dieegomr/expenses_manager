import { Module } from '@nestjs/common';
import { PasswordHashing } from 'src/@core/domain/interfaces/password-hashing.interface';
import { TokenGenerator } from 'src/@core/domain/interfaces/token-generator.interface';
import { BcryptPasswordHashing } from 'src/@core/infra/bcrypt/bcrypt-password-hashing';
import { JwtTokenGenerator } from 'src/@core/infra/JWT/jwt-token-generator';
import { GetUserByEmailUseCase } from 'src/@core/usecases/get-user-by-email.use-case';
import { LoginUseCase } from 'src/@core/usecases/login.use-case';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    {
      provide: BcryptPasswordHashing,
      useClass: BcryptPasswordHashing,
    },
    {
      provide: JwtTokenGenerator,
      useClass: JwtTokenGenerator,
    },
    {
      provide: LoginUseCase,
      useFactory: (
        getUserByEmail: GetUserByEmailUseCase,
        passwordHashing: PasswordHashing,
        tokenGenerator: TokenGenerator,
      ) => {
        return new LoginUseCase(
          getUserByEmail,
          passwordHashing,
          tokenGenerator,
        );
      },
      inject: [GetUserByEmailUseCase, BcryptPasswordHashing, JwtTokenGenerator],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
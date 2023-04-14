import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PasswordHashing } from 'src/@core/domain/interfaces/password-hashing.interface';
import { TokenGenerator } from 'src/@core/domain/interfaces/token-generator.interface';
import { BcryptPasswordHashing } from 'src/@core/infra/bcrypt/bcrypt-password-hashing';
import { JwtTokenGenerator } from 'src/@core/infra/JWT/jwt-token-generator';
import { GetUserByEmailUseCase } from 'src/@core/usecases/get-user-by-email.use-case';
import { LoginUseCase } from 'src/@core/usecases/login.use-case';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';

@Module({
  imports: [UserModule, AuthModule],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
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
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth');
  }
}

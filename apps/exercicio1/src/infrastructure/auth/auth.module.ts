import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from '@exercicio1/domain/use-cases/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule, // <-- IMPORTANTE
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

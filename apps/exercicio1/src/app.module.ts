import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './gateways/controllers/controllers.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { GatewaysModule } from './gateways/gateways.module';
import { AuthGuardService } from './–flat/gateways/guards/auth-guard/auth-guard.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './infrastructure/auth/auth.module'; // importar AuthModule que importa UsersModule

@Module({
  imports: [
    ControllersModule,
    DomainModule,
    InfrastructureModule,
    GatewaysModule,
    AuthModule, // <- importa AuthModule que fornece AuthService
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuardService,
    {
      provide: APP_GUARD,
      useClass: AuthGuardService,
    },
  ],
})
export class AppModule {}

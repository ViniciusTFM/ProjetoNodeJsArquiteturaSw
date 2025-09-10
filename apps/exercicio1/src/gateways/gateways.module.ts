import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { AuthGuardService } from '@exercicio1/–flat/gateways/guards/auth-guard/auth-guard.service';
@Module({
  imports: [ControllersModule],
  providers: [AuthGuardService],
  exports: [AuthGuardService],
})
export class GatewaysModule {}

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectsController } from './projects/projects.controller';
import { TasksController } from './tasks/tasks.controller';
import { UsersController } from './users/users.controller';
import { UseCasesModule } from '@exercicio1/domain/use-cases/use-cases.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@exercicio1/infrastructure/auth/auth.module';

@Module({
  imports: [
    UseCasesModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'PROJECTS_MANAGER_API',
        transport: Transport.REDIS,
        options: {
          host: 'localhost', // ou o service name no docker-compose
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [
    ProjectsController,
    TasksController,
    UsersController,
    AuthController,
  ],
})
export class ControllersModule {}

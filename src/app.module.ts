import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './gateways/controllers/controllers.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { GatewaysModule } from './gateways/gateways.module';
import { GetAllProjectsService } from './–flat/domain/use-cases/projects/get-all-projects/get-all-projects.service';
import { GetProjectByIdService } from './–flat/domain/use-cases/projects/get-project-by-id/get-project-by-id.service';
import { CreateProjectService } from './–flat/domain/use-cases/projects/create-project/create-project.service';
import { GetAllTasksService } from './–flat/domain/use-cases/tasks/get-all-tasks/get-all-tasks.service';
import { GetTaskByIdService } from './–flat/domain/use-cases/tasks/get-task-by-id/get-task-by-id.service';
import { CreateTaskService } from './–flat/domain/use-cases/tasks/create-task/create-task.service';
import { UpdateTaskService } from './–flat/domain/use-cases/tasks/update-task/update-task.service';
import { CreateUserService } from './–flat/domain/use-cases/users/create-user/create-user.service';
import { GetUserByIdService } from './–flat/domain/use-cases/users/get-user-by-id/get-user-by-id.service';

@Module({
  imports: [
    ControllersModule,
    DomainModule,
    InfrastructureModule,
    GatewaysModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GetAllProjectsService,
    GetProjectByIdService,
    CreateProjectService,
    GetAllTasksService,
    GetTaskByIdService,
    CreateTaskService,
    UpdateTaskService,
    CreateUserService,
    GetUserByIdService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksEntity } from '@tasks/infrastructure/database/entities/task.entity';

import { GetAllTasksService } from '@tasks/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from '@tasks/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskService } from '@tasks/domain/use-cases/tasks/create-task.service';
import { TasksRepositoryService } from '@tasks/infrastructure/database/repositories/tasks.repository.service';

import { UsersModule } from '@exercicio1/domain/use-cases/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksEntity]), // registra a entidade
    UsersModule, // fornece UsersRepositoryService
  ],
  controllers: [TasksController],
  providers: [
    GetAllTasksService,
    GetTaskByIdService,
    CreateTaskService,
    TasksRepositoryService, // injetável automaticamente via @InjectRepository
  ],
})
export class TasksModule {}

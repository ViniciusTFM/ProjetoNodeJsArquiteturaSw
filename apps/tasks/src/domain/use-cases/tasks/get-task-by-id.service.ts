import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '@exercicio1/domain/use-cases/base-use-case';
import { ITask } from '@tasks/domain/interfaces/task.interface';
import { TasksRepositoryService } from '@tasks/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from '@exercicio1/infrastructure/database/repositories/users.repository.service';
@Injectable()
export class GetTaskByIdService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
  ) {}
  async execute(payload: { taskId: number; userId: number }): Promise<ITask> {
    // fetch user data
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    const task = await this.tasksRepository.findById(payload.taskId);
    if (!task) {
      throw new Error('Erro ao listar tarefas');
    }
    return task;
  }
}

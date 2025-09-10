import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, DeepPartial, Repository, UpdateResult } from 'typeorm';
import { TasksEntity } from '../entities/task.entity';
import { ITask } from '@tasks/domain/interfaces/task.interface';
import { ITasksRepository } from '@tasks/domain/repositories/tasks-repository.interface';

@Injectable()
export class TasksRepositoryService
  extends Repository<TasksEntity>
  implements ITasksRepository
{
  constructor(dataSource: DataSource) {
    super(TasksEntity, dataSource.createEntityManager());
  }

  async findAll(userId: number): Promise<ITask[]> {
    return this.find({
      where: { user: { id: userId } },
    });
  }

  async findById(id: number): Promise<ITask> {
    const task = await this.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async add(payload: DeepPartial<ITask>): Promise<ITask> {
    return this.save(payload);
  }

  async updateById(payload: DeepPartial<ITask>): Promise<UpdateResult> {
    if (!payload.id) {
      throw new NotFoundException('Task ID is required for update');
    }

    return this.update(payload.id, payload);
  }
}

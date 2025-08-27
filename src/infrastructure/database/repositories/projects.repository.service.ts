import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectEntity } from '../entities/project.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { IProject } from 'src/domain/interfaces/project.interface';
import { IProjectsRepository } from 'src/domain/repositories/projects-repository.interface';

@Injectable()
export class ProjectsRepositoryService
  extends Repository<ProjectEntity>
  implements IProjectsRepository
{
  constructor(dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  async findAll(userId: number): Promise<IProject[]> {
    return this.find({
      where: { user: { id: userId } },
    });
  }

  async findById(id: number): Promise<IProject> {
    const project = await this.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  async add(payload: DeepPartial<IProject>): Promise<IProject> {
    return this.save(payload);
  }
}

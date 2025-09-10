import { Injectable } from '@nestjs/common';
import { IProject } from '@exercicio1/domain/interfaces/project.interface';
import { ProjectsRepositoryService } from '@exercicio1/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from '@exercicio1/infrastructure/database/repositories/users.repository.service';
@Injectable()
export class GetProjectByIdService {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly projectsRepository: ProjectsRepositoryService,
  ) {}
  async execute(payload: {
    userId: number;
    projectId: number;
  }): Promise<IProject> {
    // fetch user data
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    const project = await this.projectsRepository.findById(payload.projectId);
    if (!project) {
      throw new Error('Erro ao recuperar projetos');
    }
    return project;
  }
}

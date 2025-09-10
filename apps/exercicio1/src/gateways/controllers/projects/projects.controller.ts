import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateProjectService } from '@exercicio1/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from '@exercicio1/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from '@exercicio1/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectDto } from './dtos/create-project.dto';

interface AuthRequest extends Request {
  user: { sub: number; email?: string };
}

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly getAllProjectsUseCase: GetAllProjectsService,
    private readonly getProjectByIdUseCase: GetProjectByIdService,
    private readonly createProjectUseCase: CreateProjectService,
  ) {}

  @Get()
  async findAll(@Req() request: AuthRequest) {
    try {
      const loggedUser = request.user;
      return await this.getAllProjectsUseCase.execute(loggedUser.sub);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Unexpected error');
    }
  }

  @Get(':id')
  async findOne(@Req() request: AuthRequest, @Param('id') id: number) {
    try {
      const loggedUser = request.user;
      return await this.getProjectByIdUseCase.execute({
        userId: loggedUser.sub,
        projectId: id,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Unexpected error');
    }
  }

  @Post()
  async create(
    @Req() request: AuthRequest,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    try {
      const loggedUser = request.user;
      return await this.createProjectUseCase.execute({
        userId: loggedUser.sub,
        project: createProjectDto,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new UnprocessableEntityException('Unexpected error');
    }
  }
}

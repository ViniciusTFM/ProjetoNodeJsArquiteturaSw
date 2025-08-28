import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskDto } from './dtos/create-task.dto';

// Interface para tipar request com usuário logado
interface AuthRequest extends Request {
  user: { sub: number; email?: string };
}

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly createTaskUseCase: CreateTaskService,
  ) {}

  @Get()
  async findAll(@Req() request: AuthRequest) {
    try {
      const loggedUser = request.user;
      return await this.getAllTasksUseCase.execute({ userId: loggedUser.sub });
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
      return await this.getTaskByIdUseCase.execute({
        userId: loggedUser.sub,
        taskId: id,
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
    @Body() createTaskDto: CreateTaskDto,
  ) {
    try {
      const loggedUser = request.user;
      return await this.createTaskUseCase.execute({
        userId: loggedUser.sub,
        task: createTaskDto,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new UnprocessableEntityException('Unexpected error');
    }
  }
}

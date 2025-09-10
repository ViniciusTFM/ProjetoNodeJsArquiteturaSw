import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthRequest extends Request {
  user: { sub: number; email?: string };
}

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('PROJECTS_MANAGER_API') private readonly redisClient: ClientProxy,
  ) {}

  @Get()
  findAll(@Req() request: AuthRequest): Observable<any> {
    const loggedUser = request.user;
    return this.redisClient
      .send({ cmd: 'get_tasks' }, { userId: loggedUser.sub })
      .pipe(
        catchError((error: unknown) => {
          if (error instanceof Error) {
            return throwError(() => new NotFoundException(error.message));
          }
          return throwError(() => new NotFoundException('Unexpected error'));
        }),
      );
  }

  @Get(':id')
  findOne(
    @Req() request: AuthRequest,
    @Param('id') id: number,
  ): Observable<any> {
    const loggedUser = request.user;
    return this.redisClient
      .send({ cmd: 'get_task_by_id' }, { userId: loggedUser.sub, taskId: id })
      .pipe(
        catchError((error: unknown) => {
          if (error instanceof Error) {
            return throwError(() => new NotFoundException(error.message));
          }
          return throwError(() => new NotFoundException('Unexpected error'));
        }),
      );
  }

  @Post()
  create(
    @Req() request: AuthRequest,
    @Body() createTaskDto: CreateTaskDto,
  ): Observable<any> {
    const loggedUser = request.user;
    return this.redisClient
      .send(
        { cmd: 'create_task' },
        { userId: loggedUser.sub, task: createTaskDto },
      )
      .pipe(
        catchError((error: unknown) => {
          if (error instanceof Error) {
            return throwError(
              () => new UnprocessableEntityException(error.message),
            );
          }
          return throwError(
            () => new UnprocessableEntityException('Unexpected error'),
          );
        }),
      );
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './database/entities/task.entity';
import { TasksRepositoryService } from './database/repositories/tasks.repository.service';
import { ProjectEntity } from '@exercicio1/infrastructure/database/entities/project.entity';
import { UserEntity } from '@exercicio1/infrastructure/database/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([TasksEntity, ProjectEntity, UserEntity]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [TasksRepositoryService],
  exports: [TasksRepositoryService],
})
export class InfrastructureModule {}

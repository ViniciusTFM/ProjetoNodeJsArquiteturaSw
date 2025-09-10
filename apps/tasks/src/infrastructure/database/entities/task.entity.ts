import type { IProject } from '@exercicio1/domain/interfaces/project.interface';
import type { ITask } from '@tasks/domain/interfaces/task.interface';
import type { IUser } from '@exercicio1/domain/interfaces/user.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '@exercicio1/infrastructure/database/entities/project.entity';
import { UserEntity } from '@exercicio1/infrastructure/database/entities/user.entity';
@Entity('tasks')
export class TasksEntity implements ITask {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'status', nullable: false })
  status: 'pending' | 'completed';
  @ManyToOne(() => ProjectEntity, (project) => project.tasks, {
    cascade: true,
    nullable: false,
  })
  project: IProject;
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn()
  user: IUser;
}

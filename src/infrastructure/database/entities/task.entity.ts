import type { IProject } from 'src/domain/interfaces/project.interface';
import type { ITask } from 'src/domain/interfaces/task.interface';
import type { IUser } from 'src/domain/interfaces/user.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';
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

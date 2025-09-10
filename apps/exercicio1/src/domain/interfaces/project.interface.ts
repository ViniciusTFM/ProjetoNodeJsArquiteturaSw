import type { ITask } from '@tasks/domain/interfaces/task.interface';
import type { IUser } from './user.interface';

export interface IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];
  user: IUser;
}

import type { IProject } from './project.interface';
import type { ITask } from '@tasks/domain/interfaces/task.interface';
export class IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  projects: IProject[];
  tasks: ITask[];
}

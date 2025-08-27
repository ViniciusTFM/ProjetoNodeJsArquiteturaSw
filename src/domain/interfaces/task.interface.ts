import type { IProject } from './project.interface';
import type { IUser } from './user.interface';
export class ITask {
  id: number;
  name: string;
  status: 'pending' | 'completed';
  project: IProject;
  user: IUser;
}

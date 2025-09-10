import type { IProject } from '@exercicio1/domain/interfaces/project.interface';
import type { IUser } from '@exercicio1/domain/interfaces/user.interface';
export class ITask {
  id: number;
  name: string;
  status: 'pending' | 'completed';
  project: IProject;
  user: IUser;
}

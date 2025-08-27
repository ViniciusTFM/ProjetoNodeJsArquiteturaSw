import { DeepPartial } from 'typeorm';
import { IProject } from '../interfaces/project.interface';
export interface IProjectsRepository {
  findAll(userId: number): Promise<IProject[]>;
  findById(id: number): Promise<IProject>;
  add(payload: DeepPartial<IProject>): Promise<IProject>;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { IUser } from 'src/domain/interfaces/user.interface';
import { IUsersRepository } from 'src/domain/repositories/users-repository.interface';

@Injectable()
export class UsersRepositoryService
  extends Repository<UserEntity>
  implements IUsersRepository
{
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<IUser> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async add(payload: DeepPartial<UserEntity>): Promise<IUser> {
    const entity = await this.save(payload);
    return entity; // UserEntity implementa IUser
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}

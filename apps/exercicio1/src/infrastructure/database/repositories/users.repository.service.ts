import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUser } from '@exercicio1/domain/interfaces/user.interface';
import { IUsersRepository } from '@exercicio1/domain/repositories/users-repository.interface';

@Injectable()
export class UsersRepositoryService implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<IUser> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async add(payload: DeepPartial<UserEntity>): Promise<IUser> {
    const entity = await this.repository.save(payload);
    return entity;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.repository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@exercicio1/infrastructure/database/entities/user.entity';
import { CreateUserService } from './create-user.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { GetUserByEmailService } from './get-user-by-email.service';
import { UsersRepositoryService } from '@exercicio1/infrastructure/database/repositories/users.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    CreateUserService,
    GetUserByIdService,
    GetUserByEmailService,
    UsersRepositoryService,
  ],
  exports: [
    CreateUserService,
    GetUserByIdService,
    GetUserByEmailService,
    UsersRepositoryService,
  ],
})
export class UsersModule {}

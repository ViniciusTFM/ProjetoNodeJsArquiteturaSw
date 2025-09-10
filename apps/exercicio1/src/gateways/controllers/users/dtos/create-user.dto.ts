import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O primeiro nome é obrigatório' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'O sobrenome é obrigatório' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString()
  password: string;
}

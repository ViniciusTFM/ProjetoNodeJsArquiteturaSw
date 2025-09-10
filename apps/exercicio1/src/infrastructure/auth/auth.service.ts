import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmailService } from '@exercicio1/domain/use-cases/users/get-user-by-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly getUserByEmailService: GetUserByEmailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // Busca usuário pelo e-mail
    const user = await this.getUserByEmailService.execute(email);

    console.log('User fetched from DB:', user);

    // Valida a senha
    const isValidUser = await compare(password, user.password);

        console.log('password:', password);
        console.log('user.password:', user.password);
        console.log('isValidUser:', isValidUser);

    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Cria o payload do JWT
    const payload = { sub: user.id, username: user.email };

    // Retorna o token assinado
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

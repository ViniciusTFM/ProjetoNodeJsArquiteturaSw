import { IsNotEmpty, IsString } from 'class-validator';

// Definimos o construtor explicitamente para ajudar o TypeScript/ESLint
export class CreateProjectDto {
  @IsNotEmpty({ message: 'O nome do projeto precisa de ser definido' })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: 'A descrição do projeto precisa de ser definida' })
  @IsString()
  description!: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

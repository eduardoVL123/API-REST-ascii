// src/dtos/CreateProduto.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

// Esta classe define o formato dos dados
export class CreateProdutoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  nome!: string; 

  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser um valor positivo.' })
  preco!: number; 
  @IsString({ message: 'A categoria deve ser um texto.' })
  @IsNotEmpty({ message: 'A categoria não pode ser vazia.' })
  categoria!: string; 
}
// src/dtos/UpdateProduto.dto.ts
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

// Esta classe define os campos que 'podem' ser atualizados.
// Usamos @IsOptional() em todos.
export class UpdateProdutoDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser um texto.' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  nome?: string; // O '?' indica que o campo é opcional

  @IsOptional()
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser um valor positivo.' })
  preco?: number;

  @IsOptional()
  @IsString({ message: 'A categoria deve ser um texto.' })
  categoria?: string;
}
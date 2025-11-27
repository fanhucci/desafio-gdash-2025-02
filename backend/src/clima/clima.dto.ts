import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsISO8601, IsInt, Min, Max } from 'class-validator';

export class ClimaDto {
    
  @ApiProperty({
    description: 'Código do ícone do clima (ex: 01n, 10d)',
    example: '01n',
  })

  @IsString({ message: 'iconeClima deve ser uma string' })
  iconeClima: string;

  @ApiProperty({
    description: 'Nome curto do clima',
    example: 'Clear',
  })

  @IsString()
  nomeClima: string;

  @ApiProperty({
    description: 'Descrição completa do clima',
    example: 'céu limpo',
  })

  @IsString()
  descricaoClima: string;

  @ApiProperty({
    description: 'Temperatura atual em °C',
    example: 18.81,
  })

  @IsNumber()
  temperatura: number;

  @ApiPropertyOptional({
    description: 'Sensação térmica em °C',
    example: 18.63,
  })


  @IsNumber()
  sensacao: number

  @ApiPropertyOptional({
    description: 'Temperatura mínima do dia',
    example: 18.81,
  })


  @IsNumber()
  tempMin: number

  @ApiPropertyOptional({
    description: 'Temperatura máxima do dia',
    example: 22.5,

  })

  @IsNumber()
  tempMax: number 

  @ApiPropertyOptional({
    description: 'Pressão atmosférica (hPa)',
    example: 1013
  })


  @IsInt()
  pressaoAr: number

  @ApiProperty({
    description: 'Umidade relativa do ar (%)',
    example: 72,
    minimum: 0,
    maximum: 100,
  })

  @IsInt()
  @Min(0)
  @Max(100)
  umidade: number;

  @ApiPropertyOptional({
    description: 'Velocidade do vento (m/s)',
    example: 2.57,
  })

  @IsOptional()
  @IsNumber()
  velocidadeVento: number 

  @ApiPropertyOptional({
    description: 'Direção do vento em graus',
    example: 100,
    nullable: true,
  })

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(360)
  direcaoVento: number

  @ApiPropertyOptional({
    description: 'Volume de chuva nas últimas 1h (mm)',
    example: 0,
  })

  @IsOptional()
  @IsNumber()
  chuva: number | null

  @ApiPropertyOptional({
    description: 'Volume de neve nas últimas 1h (mm)',
    example: null,
    nullable: true,
  })

  @IsOptional()
  @IsNumber()
  neve: number 

  @ApiPropertyOptional({
    description: 'Percentual de nuvens (%)',
    example: 0,
    nullable: true,
  })

  @IsInt()
  @Min(0)
  @Max(100)
  nuvens: number;

  @ApiProperty({
    description: 'Data e hora da medição (ISO 8601)',
    example: '2025-11-25T01:41:51+00:00',
  })
  @IsISO8601({ strict: true }, { message: 'Formato de data inválido' })
  data: string;
}
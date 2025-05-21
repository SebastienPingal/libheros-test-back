import { IsString, IsOptional, IsDateString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsDateString()
  @IsOptional()
  expirationDate: Date
}


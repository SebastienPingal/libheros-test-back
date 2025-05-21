import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsDate()
  @IsOptional()
  expirationDate: Date
}


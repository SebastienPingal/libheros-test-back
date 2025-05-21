import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator'

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsDate()
  @IsOptional()
  expirationDate: Date

  @IsBoolean()
  @IsOptional()
  completed: boolean
}
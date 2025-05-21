import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator'

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsDateString()
  @IsOptional()
  expirationDate: Date

  @IsBoolean()
  @IsOptional()
  completed: boolean
}
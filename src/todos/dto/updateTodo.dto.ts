import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class UpdateTodoDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  completed: boolean
}
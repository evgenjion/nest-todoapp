import { IsBoolean, IsOptional, IsString } from 'class-validator';

// https://github.com/typestack/class-validator#validation-decorators

export class TaskDTO {
  @IsOptional()
  id: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsBoolean()
  archived: boolean;
  @IsBoolean()
  completed: boolean;
}

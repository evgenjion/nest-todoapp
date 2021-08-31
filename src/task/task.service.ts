import { Injectable } from '@nestjs/common';
import { Filter } from 'src/utils/filter';
import { TaskDTO } from './task.dto';
import { TaskMapper } from './task.mapper';

interface ITaskServiceOptions {
  filter: Filter;
}

@Injectable()
export class TaskService {
  async getAll({ filter }: ITaskServiceOptions) {
    return new TaskMapper({ filter }).findAll();
  }

  async getById(id: string, { filter }: ITaskServiceOptions) {
    return new TaskMapper({ filter }).findById(Number(id));
  }

  async saveTask(task: TaskDTO) {
    return new TaskMapper().saveTask(task);
  }
}

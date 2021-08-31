import {
  Body,
  Controller,
  Get,
  HttpCode,
  MethodNotAllowedException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './task.dto';
import { Filter } from 'src/utils/filter';

@Controller({
  path: '/tasks',
  version: '/1',
})
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  async getAll(@Query('filter') filterStr: string) {
    const filter = new Filter(filterStr);

    return await this.taskService.getAll({ filter });
  }

  @Get('/:id')
  async getById(
    @Param('id') id: string,
    @Query('filter') filterString: string,
  ) {
    const filter = new Filter(filterString);
    const task = await this.taskService.getById(id, {
      filter,
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} is not found`);
    }

    return task;
  }

  @Post('/')
  @HttpCode(201)
  async add(@Body() taskDTO: TaskDTO) {
    return await this.taskService.saveTask(taskDTO);
  }

  @Put('/:id')
  async put() {
    throw new MethodNotAllowedException();
  }
}

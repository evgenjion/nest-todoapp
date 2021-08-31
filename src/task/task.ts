import { TaskDTO } from './task.dto';

export class Task extends TaskDTO {
  constructor({ id, name, description, archived, completed }: TaskDTO) {
    super();

    this.id = id;
    this.name = name;
    this.description = description;
    this.archived = archived;
    this.completed = completed;
  }
}

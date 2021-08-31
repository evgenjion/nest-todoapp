import { BaseMapper } from 'src/interfaces/BaseMapper';
import { Task } from './task';
import { TaskDTO } from './task.dto';

const TASKS_DATA: TaskDTO[] = [];
stubData();

export class TaskMapper extends BaseMapper<Task> {
  private data: ReturnType<typeof stubData>;

  constructor(options?) {
    super(options);
    // TODO: AWS
    this.data = TASKS_DATA;
  }

  entityFilter = (entity) => {
    const { filter } = this;

    if (!entity) {
      return false;
    }

    const archived = filter.getCriterion('archived');
    const completed = filter.getCriterion('completed');

    // Show archived only on demand
    if (!['true', 'all'].includes(archived) && entity.archived) {
      return false;
    }

    if (completed === 'false' && entity.completed === true) {
      return false;
    }

    return true;
  };

  async findAll() {
    return this.data
      .filter(this.entityFilter)
      .map(({ id, name, description, archived, completed }) => {
        return new Task({ id, name, description, archived, completed });
      });
  }

  async findById(id) {
    const el = this.data.find(({ id: _id }) => _id === id);
    let task;

    if (!this.entityFilter(el)) {
      return;
    }

    if (el) {
      task = new Task({
        id: el.id,
        name: el.name,
        description: el.description,
        archived: el.archived,
        completed: el.completed,
      });
    }

    return task;
  }

  async saveTask(task: TaskDTO) {
    if (!task.id) {
      task.id = this.data.length + 1; // dummy id increment
    }

    TASKS_DATA.push(task);

    return task;
  }
}

function stubData(): TaskDTO[] {
  TASKS_DATA.push(
    {
      id: 1,
      name: 'Вынести мусор',
      description: 'Нужно вынести мусор из кухни, или тебе хана',
      archived: false,
      completed: false,
    },
    {
      id: 2,
      name: 'Помыть посуду',
      description: 'Сколько можно блё',
      archived: true,
      completed: false,
    },
    {
      id: 3,
      name: 'Приготовить еду',
      description: 'А то помрешь с голоду',
      archived: false,
      completed: true,
    },
    {
      id: 4,
      name: 'Сделать таску',
      description: 'А то уволят реальне',
      archived: false,
      completed: false,
    },
  );

  return TASKS_DATA;
}

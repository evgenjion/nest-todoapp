import { Filter } from 'src/utils/filter';
import { IEntity } from './IEntity';

export interface BaseMapperConstructorParams {
  filter?: Filter;
}

/**
 * TODO: better place for abstract class ????
 */
export abstract class BaseMapper<T extends IEntity> {
  protected filter;
  protected abstract entityFilter(t: T): boolean;

  constructor(options?: BaseMapperConstructorParams) {
    this.filter = options?.filter;
  }

  abstract findAll(): Promise<T[]>;
  abstract findById(id: T['id']): Promise<T>;
}

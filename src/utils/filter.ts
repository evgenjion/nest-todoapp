export type ParsedFilter = Record<string, string>;

export class FilterParseError extends Error {}

export class Filter {
  #value: ParsedFilter;

  constructor(filter?: string) {
    if (!filter) {
      this.#value = {};

      return this;
    }

    // TODO: 'skip', 'limit' отдельно
    this.#value = this.parse(filter);
  }

  /**
   *
   * @param filterString
   */
  private parse(filterString: string) {
    return filterString
      .split(';')
      .reduce<ParsedFilter>((acc, filterProperty) => {
        const [key, value] = filterProperty.split(':');

        if (!key || !value) {
          throw new FilterParseError('Wrong filter format');
        }

        acc[key] = value;

        return acc;
      }, {});
  }

  public getCriterion(criterion: string) {
    return this.#value[criterion] || null;
  }

  public getValue() {
    return this.#value;
  }
}

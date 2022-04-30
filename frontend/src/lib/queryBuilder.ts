export class QueryBuilder {
  private query: string = "";

  constructor(initialQuery: string) {
    this.query = initialQuery + "?";
  }

  public addQuery(query: string) {
    if (query) {
      this.query += `${query}&`;
    }
  }

  public getQuery() {
    return this.query;
  }
}

export class FilterQueryBuilder extends QueryBuilder {
  constructor(initialQuery: string) {
    super(initialQuery);
  }

  public addFilter(filter: string) {
    if (filter) {
      this.addQuery(filter);
    }
  }

  addStringQuery = (field: string, value?: string) =>
    !!value && this.addFilter(`${field}=${value}`);

  addRangeNumberQuery = (field: string, { min, max }: any) => {
    min = !!min ? min : 0;
    max = !!max ? max : Number.POSITIVE_INFINITY;
    return this.addFilter(`${field}=${min}-${max}`);
  };

 
}

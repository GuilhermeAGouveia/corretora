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

  type = (type?: string) => !!type && this.addFilter(`type=${type}`);

  mensalidade = ({ min, max }: any) => {
    min = !!min ? min : 0;
    max = !!max ? max : Number.POSITIVE_INFINITY;
    return this.addFilter(`mensalidade=${min}-${max}`);
  };

  price = ({ min, max }: any) => {
    min = !!min ? min : 0;
    max = !!max ? max : Infinity;
    return this.addFilter(`price=${min}-${max}`);
  };
  offerType = (offerType?: string) =>
    !!offerType && this.addFilter(`offerType=${offerType}`);
  orderBy = (orderBy?: string) =>
    !!orderBy && this.addFilter(`orderBy=${orderBy}`);
  sort = (sort?: string) => !!sort && this.addFilter(`sort=${sort}`);
}

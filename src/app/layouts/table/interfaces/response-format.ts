import { Observable } from 'rxjs';

import {
  IProductDataFormat,
  IProductResponceFormat,
} from './../../../core/interfaces/data-formats';

export interface IResponsePaging {
  records: number;
  limit: number;
  offset: number;
}

export interface IQueryParams {
  page: number;
  pageSize: number;
  column?: string;
  direction?: DirectionKinds;
  pages?: number;
  limits?: number[];
}

export interface IConfigFormat {
  fetch: (parameters: IQueryParams) => Observable<IProductResponceFormat>;
  sort?: IConfigTableSort;
  pagination?: ConfigTablePagination;
  actions?: IConfigTableAction[] | undefined;
}

export interface IConfigTablePagination {
  limits?: number[];
  pageSize?: number;
}

export interface IPagConstructor {
  limits?: number[];
  pageSize?: number;
  records?: number;
}

export type ConfigTablePagination = boolean | IConfigTablePagination;

export interface IConfigTableAction {
  label: string;
  click: (row: IProductDataFormat) => void;
}

export type DirectionKinds = 'asc' | 'desc';

export interface IConfigTableSort {
  column: string;
  direction: DirectionKinds;
}

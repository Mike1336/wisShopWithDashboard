import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IResponseFormat, IQueryParams } from '../../layouts/table/interfaces/response-format';

import { IProductDataFormat } from './../../core/interfaces/data-formats';

@Injectable()

export class PhoneStoreService {

  private tableData!: IProductDataFormat[];

  public getData(query: IQueryParams, category?: string): Observable<IResponseFormat> {
    const limit = query.pageSize;
    const offset = (limit * query.page) - limit;

    const editedTableData = this.tableData.slice(offset, offset + limit);

    return of({
      data: editedTableData ?? this.tableData,
      paging: {
        records: this.tableData.length,
        limit,
        offset,
      },
    })
      .pipe(
      delay(1000),
    );
  }

}

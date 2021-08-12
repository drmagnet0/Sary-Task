import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { filter, map, reduce } from 'rxjs/operators';
import { from } from 'rxjs';
import filters from './../../../../assets/filters.json';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private api: ApiService) {}

  filters() {
    return filters.filters;
  }

  countries() {
    return this.api
      .get('http://countryapi.gear.host/v1/Country/getCountries')
      .pipe(
        map((response: any) => response.Response),
        map((list) => {
          return list.map((c) => {
            return {
              Name: c.Name,
              Alpha3Code: c.Alpha3Code,
            };
          });
        })
      );
  }
}

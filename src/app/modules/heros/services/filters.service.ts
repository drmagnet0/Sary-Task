import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import filters from './../../../../assets/filters.json';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private api: ApiService) {}

  filters() {
    return filters.filters;
  }

  data(url) {
    return this.api.get(url);
  }

  cleanObject(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (!element) {
          delete obj[key];
        }
      }
    }
    return obj;
  }
}

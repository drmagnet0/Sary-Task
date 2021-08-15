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
}

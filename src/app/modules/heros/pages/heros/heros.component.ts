import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
})
export class HerosComponent implements OnInit {
  filters;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private filtersService: FiltersService
  ) {}

  ngOnInit(): void {}

  getFilters(filters) {
    if (filters) {
      const values = this.filtersService.cleanObject(
        Object.assign({}, filters)
      );
      if (filters.Date) {
        console.log('before JSON.stringify -> ', filters.Date);
        values.Date = JSON.stringify(values.Date);
      }
      this.filters = values;
      this.updateUrl(values);
    }
  }

  updateUrl(queryParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      skipLocationChange: false,
    });
  }
}

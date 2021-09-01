import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-heros-filters',
  templateUrl: './heros-filters.component.html',
  styleUrls: ['./heros-filters.component.scss'],
})
export class HerosFiltersComponent implements OnInit {
  herosFiltersForm: FormGroup;
  filters;
  countriesList = [];
  today: NgbDateStruct;
  @Output() update = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private filtersService: FiltersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFilters();
    this.setToday();
  }

  getFilters() {
    this.filters = this.filtersService.filters();
    this.formInit(this.filters);
  }

  formInit(inputs) {
    this.herosFiltersForm = this.fb.group({});
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      this.herosFiltersForm.addControl(input.title, new FormControl(''));
      if (input.type === 'dropdown') {
        this.getData(index, input.api);
      }
    }
    this.readUrl();
  }

  getData(index, apiUrl) {
    this.filtersService
      .data(apiUrl)
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
      )
      .subscribe((data) => {
        this.filters[index].data = data;
      });
  }

  readUrl() {
    this.route.queryParamMap.subscribe((params: any) => {
      const values = Object.assign({}, params.params);
      if (values) {
        this.setFilters(values);
        this.filter();
      }
    });
  }

  setFilters(filters) {
    if (filters.Date) {
      filters.Date = JSON.parse(filters.Date);
    }
    this.herosFiltersForm.patchValue(filters);
  }

  setToday() {
    const todat = new Date();
    this.today = {
      year: todat.getFullYear(),
      month: todat.getMonth() + 1,
      day: todat.getDay(),
    };
  }

  filter() {
    const values = this.filtersService.cleanObject(this.herosFiltersForm.value);
    console.log('emit -> ', values);

    this.update.emit(values);
  }
}

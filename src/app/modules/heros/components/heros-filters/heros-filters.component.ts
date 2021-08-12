import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-heros-filters',
  templateUrl: './heros-filters.component.html',
  styleUrls: ['./heros-filters.component.scss'],
})
export class HerosFiltersComponent implements OnInit {
  herosFiltersForm: FormGroup;
  countriesList = [];
  today: NgbDateStruct;

  constructor(
    private fb: FormBuilder,
    private filtersService: FiltersService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getCountries();
    this.setToday();
  }

  formInit() {
    this.herosFiltersForm = this.fb.group({
      email: [''],
      country: ['EGY'],
      date: [''],
    });
  }

  getCountries() {
    this.filtersService.countries().subscribe((list) => {
      this.countriesList = list;
    });
  }

  setToday() {
    const todat = new Date();
    this.today = {
      /**
       * The year, for example 2016
       */
      year: todat.getFullYear(),
      /**
       * The month, for example 1=Jan ... 12=Dec
       */
      month: todat.getMonth() + 1,
      /**
       * The day of month, starting at 1
       */
      day: todat.getDay(),
    };
  }

  filter() {
    if (this.herosFiltersForm.valid) {
      console.log(this.herosFiltersForm.value);
    } else {
      console.log(this.herosFiltersForm.value);
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
})
export class HerosComponent implements OnInit {
  filters;

  constructor() {}

  ngOnInit(): void {}

  applyFilters(filters) {
    this.filters = filters;
  }
}

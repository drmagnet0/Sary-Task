import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heros-list',
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
})
export class HerosListComponent implements OnInit {
  @Input() set filters(value) {
    if (value) {
      // console.log(value);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}

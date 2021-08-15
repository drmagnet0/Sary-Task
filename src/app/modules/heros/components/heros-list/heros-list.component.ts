import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heros-list',
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
})
export class HerosListComponent implements OnInit {
  @Input() set filters(value) {
    console.log(value);
    if (value && value.Date) {
      value.Date = JSON.stringify(value.Date);
    }
    this.updateUrl(value);
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  updateUrl(filters) {
    const queryParams = this.cleanObject(filters);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      skipLocationChange: false,
    });
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

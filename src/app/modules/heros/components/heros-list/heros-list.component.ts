import { DatePipe } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Hero } from '../../models/hero';
import { HerosService } from '../../services/heros.service';

const rotate = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable;
  @Input() direction = '';
  @Output() sort = new EventEmitter();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
@Component({
  selector: 'app-heros-list',
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
})
export class HerosListComponent implements OnInit {
  heros: Hero[];
  herosCopy: Hero[];
  herosFilters;
  @Input() set filters(values) {
    if (values) {
      if (values.Date) {
        values.Date = JSON.parse(values.Date);
      }
      this.herosFilters = values;
      this.onFilter(this.herosFilters);
    }
  }

  constructor(private herosService: HerosService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getHeros();
  }

  getHeros() {
    this.heros = this.herosService.heros();
    this.herosCopy = this.heros;
    if (this.herosFilters) {
      this.onFilter(this.herosFilters);
    }
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting heros
    if (column === '' || direction === '') {
      this.heros = this.herosCopy;
    } else {
      this.heros = [...this.herosCopy].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  onFilter(filters) {
    console.log(filters);
    if (this.heros) {
      if (!Object.keys(filters).length) {
        this.heros = this.herosCopy;
        return;
      }
      this.heros = [...this.herosCopy].filter((hero) => {
        for (const key in filters) {
          if (Object.prototype.hasOwnProperty.call(filters, key)) {
            let filterVal = filters[key];
            let heroVal = hero[key.toLowerCase()];
            console.log(key, filterVal, heroVal);
            if (key === 'Date') {
              filterVal = this.fixDate(filterVal);
            }
            console.log(key, filterVal, heroVal);
            if (heroVal.toLowerCase().includes(filterVal.toLowerCase())) {
              return true;
            }
          }
        }
        return false;
      });
    }
  }

  fixDate(date) {
    const d = new Date(date.year, date.month - 1, date.day);
    return this.datePipe.transform(d, 'yyyy-MM-dd');
  }
}

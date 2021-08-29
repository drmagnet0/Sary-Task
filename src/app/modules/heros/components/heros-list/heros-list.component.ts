import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Hero } from '../../models/hero';
import { HerosService } from '../../services/heros.service';

export type SortColumn = keyof Hero | string | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Component({
  template: '',
})
export class NgbdSortableHeader {
  @Input() sortable = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

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
  heros;
  herosFilters;
  @Input() set filters(value) {
    if (value) {
      this.herosFilters = value;
      console.log(value);
    }
  }

  constructor(private herosService: HerosService) {}

  ngOnInit(): void {
    this.getHeros();
  }

  getHeros() {
    this.heros = this.herosService.heros();
    console.log(this.heros);
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    console.log(column, direction);

    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.heros = this.heros;
    } else {
      this.heros = [...this.heros].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}

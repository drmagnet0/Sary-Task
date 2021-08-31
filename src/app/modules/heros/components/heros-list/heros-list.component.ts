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
  @Input() set filters(value) {
    if (value) {
      this.herosFilters = value;
    }
  }

  constructor(private herosService: HerosService) {}

  ngOnInit(): void {
    this.getHeros();
  }

  getHeros() {
    this.heros = this.herosService.heros();
    this.herosCopy = this.heros;
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
}

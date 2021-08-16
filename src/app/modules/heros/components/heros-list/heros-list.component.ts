import { Component, Input, OnInit } from '@angular/core';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-heros-list',
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
})
export class HerosListComponent implements OnInit {
  heros;
  @Input() set filters(value) {
    if (value) {
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

  onSort(e) {
    console.log(e);
  }
}

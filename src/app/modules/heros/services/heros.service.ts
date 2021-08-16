import { Injectable } from '@angular/core';
import heros from './../../../../assets/heros.json';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  constructor() {}

  heros() {
    return heros.heros;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  HerosListComponent,
  NgbdSortableHeader,
} from './components/heros-list/heros-list.component';
import { HerosFiltersComponent } from './components/heros-filters/heros-filters.component';
import { HerosRoutingModule } from './heros-routing.module';
import { HerosComponent } from './pages/heros/heros.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from './models/hero';

@NgModule({
  declarations: [
    HerosListComponent,
    HerosFiltersComponent,
    HerosComponent,
    NgbdSortableHeader,
  ],
  imports: [
    CommonModule,
    HerosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [DatePipe],
})
export class HerosModule {}

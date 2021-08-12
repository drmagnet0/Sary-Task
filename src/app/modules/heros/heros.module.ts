import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosListComponent } from './components/heros-list/heros-list.component';
import { HerosFiltersComponent } from './components/heros-filters/heros-filters.component';
import { HeroComponent } from './models/hero/hero.component';
import { HerosRoutingModule } from './heros-routing.module';
import { HerosComponent } from './pages/heros/heros.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HerosListComponent,
    HerosFiltersComponent,
    HeroComponent,
    HerosComponent,
  ],
  imports: [
    CommonModule,
    HerosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
})
export class HerosModule {}

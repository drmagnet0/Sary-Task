import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosComponent } from './modules/heros/pages/heros/heros.component';

const routes: Routes = [
  { path: '', redirectTo: 'heros', pathMatch: 'full' },
  {
    path: 'heros',
    loadChildren: () =>
      import('./modules/heros/heros.module').then((m) => m.HerosModule),
  },
  { path: '**', redirectTo: 'heros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

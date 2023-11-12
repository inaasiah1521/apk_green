import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TahunanPage } from './tahunan.page';

const routes: Routes = [
  {
    path: '',
    component: TahunanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TahunanPageRoutingModule {}

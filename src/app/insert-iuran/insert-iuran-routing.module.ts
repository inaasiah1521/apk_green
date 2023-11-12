import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertIuranPage } from './insert-iuran.page';

const routes: Routes = [
  {
    path: '',
    component: InsertIuranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertIuranPageRoutingModule {}

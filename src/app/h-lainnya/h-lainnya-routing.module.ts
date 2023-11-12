import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HLainnyaPage } from './h-lainnya.page';

const routes: Routes = [
  {
    path: '',
    component: HLainnyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HLainnyaPageRoutingModule {}

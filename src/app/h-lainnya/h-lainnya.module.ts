import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HLainnyaPageRoutingModule } from './h-lainnya-routing.module';

import { HLainnyaPage } from './h-lainnya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HLainnyaPageRoutingModule
  ],
  declarations: [HLainnyaPage]
})
export class HLainnyaPageModule {}

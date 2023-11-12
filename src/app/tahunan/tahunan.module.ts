import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TahunanPageRoutingModule } from './tahunan-routing.module';

import { TahunanPage } from './tahunan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TahunanPageRoutingModule
  ],
  declarations: [TahunanPage]
})
export class TahunanPageModule {}

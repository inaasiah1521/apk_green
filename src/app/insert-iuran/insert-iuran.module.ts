import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertIuranPageRoutingModule } from './insert-iuran-routing.module';

import { InsertIuranPage } from './insert-iuran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertIuranPageRoutingModule
  ],
  declarations: [InsertIuranPage]
})
export class InsertIuranPageModule {}

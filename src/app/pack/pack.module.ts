import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PackListComponent } from './components/pack-list/pack-list.component';
import { PackRoutingModule } from './pack-routing.module';



@NgModule({
  declarations: [
    PackListComponent
  ],
  imports: [
    CommonModule,
    PackRoutingModule
  ],
  exports: [
    PackListComponent
  ]
})
export class PackModule { }

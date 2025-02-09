import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PackListComponent } from './components/pack-list/pack-list.component';



@NgModule({
  declarations: [
    PackListComponent
  ],
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  providers: [
    CurrencyPipe
  ],
  exports: [
    PackListComponent
  ]
})
export class PackModule { }

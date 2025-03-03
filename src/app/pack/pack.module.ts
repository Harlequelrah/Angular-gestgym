import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PackListComponent } from './components/pack-list/pack-list.component';
import { PackRoutingModule } from './pack-routing.module';
import { PackModalComponent } from './components/pack-modal/pack-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PackListComponent,
    PackModalComponent
  ],
  imports: [
    CommonModule,
    PackRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PackListComponent
  ]
})
export class PackModule { }

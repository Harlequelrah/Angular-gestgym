import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuscriptionListComponent } from './components/suscription-list/suscription-list.component';
import { SuscriptionRoutingModule } from './suscription-routing.module';



@NgModule({
  declarations: [
    SuscriptionListComponent
  ],
  imports: [
    CommonModule,
    SuscriptionRoutingModule
  ]
})
export class SuscriptionModule { }

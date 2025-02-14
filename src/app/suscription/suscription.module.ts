import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuscriptionListComponent } from './components/suscription-list/suscription-list.component';
import { SuscriptionModalComponent } from './components/suscription-modal/suscription-modal.component';
import { SuscriptionRoutingModule } from './suscription-routing.module';



@NgModule({
  declarations: [
    SuscriptionListComponent,
    SuscriptionModalComponent,
  ],
  imports: [
    CommonModule,
    SuscriptionRoutingModule,
    
    FormsModule
  ]
})
export class SuscriptionModule { }

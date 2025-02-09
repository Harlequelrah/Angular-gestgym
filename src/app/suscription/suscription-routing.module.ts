import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuscriptionListComponent } from './components/suscription-list/suscription-list.component';

const routes: Routes = [
  {
    path: '',
    component:SuscriptionListComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SuscriptionRoutingModule { }

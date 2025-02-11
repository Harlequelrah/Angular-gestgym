import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuscriptionListComponent } from './components/suscription-list/suscription-list.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'customer/:customer_id',
    component: SuscriptionListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RECEPTIONIST"] }
  },
  {
    path: 'pack/:pack_id',
    component: SuscriptionListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RECEPTIONIST"] }
  },
  {
    path: '',
    component: SuscriptionListComponent,
    canActivate: [AuthGuard],
    data:{roles:["ADMIN","RECEPTIONIST"]}
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

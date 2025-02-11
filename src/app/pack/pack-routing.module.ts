import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PackListComponent } from './components/pack-list/pack-list.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'subscribe-customer/:customer_id',
    component: PackListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RECEPTIONIST"] }
  },
  {
    path: '',
    component: PackListComponent,
    canActivate: [AuthGuard],
    data: {roles: ["ADMIN","RECEPTIONIST"]}
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
export class PackRoutingModule { }

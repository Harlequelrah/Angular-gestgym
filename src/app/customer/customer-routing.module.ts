import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AuthGuard } from '../core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RECEPTIONIST"] }
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

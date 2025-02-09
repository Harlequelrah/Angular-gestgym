import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CustomerListComponent } from './customer/components/customer-list/customer-list.component';
import { PackListComponent } from './pack/components/pack-list/pack-list.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { SuscriptionListComponent } from './suscription/components/suscription-list/suscription-list.component';

const routes: Routes = [

  {
    path: 'accueil',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    data: {roles:["ADMIN","RECEPTIONIST"]}
  },
  {
    path: 'packs',
    component:PackListComponent
  },
  {
    path: 'users',
    component:UserListComponent
  },
  {
    path: 'suscriptions',
    component:SuscriptionListComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

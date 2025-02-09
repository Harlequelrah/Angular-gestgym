import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PackListComponent } from './pack/components/pack-list/pack-list.component';
import { SuscriptionListComponent } from './suscription/components/suscription-list/suscription-list.component';
import { UserListComponent } from './user/components/user-list/user-list.component';

const routes: Routes = [

  {
    path: 'accueil',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    data: {roles:["ADMIN","RECEPTIONIST"]}
  },
  {
    path: 'customers',
    loadChildren:()=> import('./customer/customer.module').then((m)=>(m.CustomerModule))
  },
  {
    path: 'packs',
    loadChildren:()=>import('./pack/pack.module').then((m)=>(m.PackModule))
  },
  {
    path: 'users',
    loadChildren:()=> import('./user/user.module').then((m)=>(m.UserModule))

  },
  {
    path: 'suscriptions',
    loadChildren:()=>import('./suscription/suscription.module').then((m)=>(m.SuscriptionModule))
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

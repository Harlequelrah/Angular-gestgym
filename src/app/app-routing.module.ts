import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [

  {
    path: 'accueil',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    data: {roles:["ADMIN","RECEPTIONIST"]}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

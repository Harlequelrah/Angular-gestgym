import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { NotAuthorizedComponent } from './core/components/not-authorized/not-authorized.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'accueil',
    component: LandingPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

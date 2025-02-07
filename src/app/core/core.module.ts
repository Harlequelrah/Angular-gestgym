import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { httpInterceptorsProviders } from './interceptors';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterLink
  ],
  exports: [
    CoreRoutingModule,
    FooterComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    HeaderComponent
  ],
  providers: [
    ...httpInterceptorsProviders,
  ]
})
export class CoreModule { }

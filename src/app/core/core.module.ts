import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { httpInterceptorsProviders } from './interceptors';



@NgModule({
  declarations: [
    FooterComponent,
    NotFoundComponent,
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    CoreRoutingModule,
    FooterComponent,
    NotFoundComponent,
    NotAuthorizedComponent
  ],
  providers: [
    ...httpInterceptorsProviders,
  ]
})
export class CoreModule { }

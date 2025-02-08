import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { httpInterceptorsProviders } from './interceptors';

import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    NotAuthorizedComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterLink,
  ],
  exports: [
    CoreRoutingModule,
    NotFoundComponent,
    NotAuthorizedComponent,
    SidebarComponent,
  ],
  providers: [
    ...httpInterceptorsProviders,
  ]
})
export class CoreModule { }

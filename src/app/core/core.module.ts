import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';
import { httpInterceptorsProviders } from './interceptors';

import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    SidebarComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterLink,
  ],
  exports: [
    CoreRoutingModule,
    NotFoundComponent,
    SidebarComponent, ForbiddenComponent

  ],
  providers: [
    ...httpInterceptorsProviders,
  ]
})
export class CoreModule { }

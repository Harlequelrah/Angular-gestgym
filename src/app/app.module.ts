import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomerModule } from './customer/customer.module';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    CustomerModule,
    AppRoutingModule,
    CoreModule,
    LoginPageComponent,
    LandingPageComponent,
    RouterOutlet,

  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:LOCALE_ID,useValue:'fr-FR'
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

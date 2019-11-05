import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SecondComponent } from './components/second/second.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SecondComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

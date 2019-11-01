import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { SecondComponent } from './components/second/second.component';
import { LogoutComponent } from './components/logout/logout.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'second', component: SecondComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],  
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}


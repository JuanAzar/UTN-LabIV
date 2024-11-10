import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "logout", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "products", component: ProductListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "**", redirectTo: "", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

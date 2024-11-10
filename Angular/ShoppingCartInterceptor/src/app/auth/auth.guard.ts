import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      let url: string = state.url;
  
      return this.checkLogin(url);
    }
  
    checkLogin(url: string): boolean {
      console.log('IsLoggedIn:' + this.authService.token);
  
      if (this.authService.token)
        return true;
  
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
  
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      
      return false;
    }
  }
  
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginFormGroup : FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    })
  }

  onSubmit()
  {
    let userCredentials = new UserCredentials();
    userCredentials.email = this.loginFormGroup.get('email').value;
    userCredentials.password = this.loginFormGroup.get('password').value;

    this.authService.login(userCredentials).subscribe(
      response => {    
        if (this.authService.token) {
          let redirect = this.authService.redirectUrl 
          ? this.router.parseUrl(this.authService.redirectUrl) : '/main';
          
          this.router.navigateByUrl(redirect);
        }
      },
    error => {
      
    });
  }
}

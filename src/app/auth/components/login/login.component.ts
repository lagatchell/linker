import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../main/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginErrorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    if (this.email !== undefined && this.password !== undefined) {
      this.authService.login(this.email, this.password).then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.loginErrorMessage = error;
      });
    }
  }

  signInWithGoogle() {
    this.authService.signInwithGoogle().then(() => {
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.loginErrorMessage = error;
    });
  }

  signup(){
    this.router.navigate(['/register']);
  }
}


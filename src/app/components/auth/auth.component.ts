import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponseData } from 'src/app/models/AuthResponseData';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    let authRequest: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      // authRequest = this.authService.login(email, password);
    } else {
      authRequest = this.authService.signup(email, password);
    }

    this.isLoading = true;
    authRequest.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.error = 'An error occurred!';
        this.isLoading = false;
      }
    );
  }
}

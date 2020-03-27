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

    const authMethod = this.isLoginMode
      ? this.authService.login
      : this.authService.signup;

    this.isLoading = true;
    authMethod(email, password).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.error = null;
      },
      (error) => {
        console.error(error);
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

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
    authMethod.call(this.authService, email, password).subscribe(
      (response) => {
        this.isLoading = false;
        this.error = null;
        console.log(response);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.error(error);
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }
}

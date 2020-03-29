import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from 'src/app/directives/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.showErrorAlert(error.message);
        this.isLoading = false;
      }
    );
  }

  onClose(): void {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertComponentFactory);
  }
}

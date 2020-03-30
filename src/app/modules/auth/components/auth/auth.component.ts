import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { PlaceholderDirective } from 'src/app/modules/shared/directives/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

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

  private showErrorAlert(message: string): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const alertComponentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    alertComponentRef.instance.message = message;
    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}

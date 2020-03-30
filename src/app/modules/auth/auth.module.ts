import { NgModule } from '@angular/core';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, AuthRoutingModule],
  declarations: [AuthComponent],
})
export class AuthModule {}

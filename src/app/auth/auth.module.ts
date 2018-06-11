import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule {}

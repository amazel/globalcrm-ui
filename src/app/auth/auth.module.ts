import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule
  ],
  providers: [AuthGuard]
})
export class AuthModule {}

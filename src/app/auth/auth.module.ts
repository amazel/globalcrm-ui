import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import {AuthGuard} from './auth-guard.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ],
  providers: [AuthGuard]
})
export class AuthModule {}

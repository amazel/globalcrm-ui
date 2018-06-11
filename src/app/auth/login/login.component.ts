import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAuth} from '../../model/user-auth.model';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  private returnUrl: string;
  message = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      console.log('is AUTHENTICATED');
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required)
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value).subscribe(
      (response: UserAuth) => {
        this.authService.setSession(response);
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.message = {
          'type': 'error',
          'text': 'Correo electronico o contraseña incorrectos'
        };
        this.loading = false;
      }
    );
  }
}

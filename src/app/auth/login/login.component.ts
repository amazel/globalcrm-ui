import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      console.log('is AUTHENTICATED');
      this.router.navigate(['/']);
    }
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password);
  }

}

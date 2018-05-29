import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}

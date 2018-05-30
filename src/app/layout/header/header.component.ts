import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onToggleButtonClick(event: any) {
    event.preventDefault();
    jQuery('#app').toggleClass('sidebar-open');
  }
}

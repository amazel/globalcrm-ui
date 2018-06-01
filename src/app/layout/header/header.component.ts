import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import 'metismenu';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

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
    $('#app').toggleClass('sidebar-open');
  }

  onOverlayClick() {
    $('#app').removeClass('sidebar-open');
  }

  ngAfterViewInit() {
    (<any>$('#sidebar-menu')).metisMenu({
      activeClass: 'open'
    });
  }
}

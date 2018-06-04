import {AfterViewInit, Component, OnInit} from '@angular/core';
import 'metismenu';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit() {
  }

  onOverlayClick() {
    $('#sidebar').removeClass('sidebar-open');
    $('#sidebar-overlay').removeClass('sidebar-open');
  }

  ngAfterViewInit() {
    (<any>$('#sidebar-menu')).metisMenu({
      activeClass: 'open'
    });
  }
}

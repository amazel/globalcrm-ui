import {AfterViewInit, Component, OnInit} from '@angular/core';
import 'metismenu';

declare var jQuery: any;

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

  ngAfterViewInit() {
    jQuery('#sidebar-menu').metisMenu({
      activeClass: 'open'
    });
  }
}

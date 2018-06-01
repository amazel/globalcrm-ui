import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @HostBinding('class.module') classM = true;

  constructor() {
  }

  ngOnInit() {
  }

}

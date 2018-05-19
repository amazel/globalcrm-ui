import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.getAll('1').subscribe(
      (data: Contact[]) => this.contacts = data,
      error1 => () => {
        console.log('ERROR');
      },
      () => {
        console.log('COMPLETE!');
      }
    );
  }

}

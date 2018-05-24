import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contactService.getContacts('1').subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      () => {
        console.log('ERROR');
      },
      () => {
        console.log('COMPLETE! List size: ', this.contacts);
      }
    );
  }
}

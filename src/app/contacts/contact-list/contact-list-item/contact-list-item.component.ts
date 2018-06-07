import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../model/contact.model';
import {ContactService} from '../../../services/contact.service';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnInit {
  @Input() contact: Contact;
  clicked = false;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  onSelected() {
  }

  getEmails(emails: Set<Email>) {
    const list = new Set();
    for (const email of emails) {
      list.add({
          'type': 'fa fa-home',
          'value': email.email
        }
      );
    }
    return list;
  }

  getPhones(phones: Set<Phone>) {
    const list = new Set();
    for (const phone of phones) {
      // todo implement pills logic
      list.add({
          'type': 'fa fa-home',
          'value': phone.phone
        }
      );
    }
    return list;
  }
}

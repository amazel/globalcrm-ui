import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../model/contact.model';
import {ContactService} from '../../contact.service';

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

  getEmails(emails) {
    const list = new Set();
    for (const email in emails) {
      if (emails[email]) {
        list.add({
            'type': 'fa fa-home',
            'value': emails[email]
          }
        );
      }
    }
    return list;
  }

  getPhones(phones) {
    const list = new Set();
    for (const phone in phones) {
      if (phones[phone]) {
        // todo implement pills logic
        list.add({
            'type': 'fa fa-home',
            'value': phones[phone]
          }
        );
      }
    }
    return list;
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../model/contact.model';
import {ContactService} from '../../../services/contact.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnInit {
  @Input() contact: Contact;
  checked = false;
  toolClicked = false;
  selectedCB: FormControl;

  constructor(private contactService: ContactService) {
    this.selectedCB = new FormControl(false);
  }

  ngOnInit() {
  }

  getEmails(emails: Set<Email>) {
    const list: any[] = [];
    for (const email of emails) {
      list.push({
          'type': 'fa fa-home',
          'value': email.email
        }
      );
    }
    return list.slice(0, 1);
  }

  getPhones(phones: Set<Phone>) {
    const list: any[] = [];
    for (const phone of phones) {
      // todo implement pills logic
      list.push({
          'type': 'fa fa-home',
          'value': phone.phone
        }
      );
    }
    return list.slice(0, 1);
  }

  deleteContact(id) {
    this.toolClicked = false;
    this.contactService.deleteContact(id);
  }

  onToolClick() {
    this.toolClicked = !this.toolClicked;
  }
}

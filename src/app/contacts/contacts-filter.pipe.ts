import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from '../model/contact.model';
import {ContactFilter} from './contact-filter';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], filter: ContactFilter): any {
    console.log('Pipe- Transform ', filter);
    if (!contacts || !filter) {
      return contacts;
    }

    return contacts.filter((item: Contact) => this.applyFilter(item, filter));
  }

  applyFilter(contact: Contact, filter: ContactFilter): boolean {
    for (const field in filter) {
      if (filter[field]) {
        if (field === 'name') {
          if ((contact['names'].toLowerCase().indexOf(filter[field].toLowerCase()) >= 0) ||
            (contact['lastNames'].toLowerCase().indexOf(filter[field].toLowerCase()) >= 0) === false) {
            return false;
          }
        } else if (field === 'phone') {
          let foundPhone = false;
          for (const phone in contact.phones) {
            if (contact.phones[phone] && contact.phones[phone].indexOf(filter[field]) >= 0) {
              foundPhone = true;
            }
          }
          if (foundPhone === false) {
            return false;
          }
        } else if (field === 'email') {
          let foundEmail = false;
          for (const email in contact.emails) {
            if (contact.emails[email] && contact.emails[email].indexOf(filter[field]) >= 0) {
              foundEmail = true;
            }
          }
          if (foundEmail === false) {
            return false;
          }
        }
      }
    }
    return true;
  }

}

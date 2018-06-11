import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from '../model/contact.model';
import {ContactFilter} from './contact-filter';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], filter: ContactFilter): any {
    if (!contacts || !filter.filter) {
      return contacts;
    }

    return contacts.filter((item: Contact) => this.applyFilter(item, filter.filter));
  }

  applyFilter(contact: Contact, filter: string): boolean {

    if ((contact['names'].toLowerCase().indexOf(filter.toLowerCase()) >= 0) ||
      (contact['lastNames'].toLowerCase().indexOf(filter.toLowerCase()) >= 0)) {
      return true;
    }

    if (contact.company.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
      return true;
    }

    for (const phone of contact.phones) {
      if (phone.phone.indexOf(filter) >= 0) {
        return true;
      }
    }

    for (const email of contact.emails) {
      if (email.email.indexOf(filter) >= 0) {
        return true;
      }
    }
    return false;
  }

}

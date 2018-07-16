import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {Subject} from 'rxjs/internal/Subject';
import {ContactFilter} from '../contacts/contact-filter';
import {Contact} from '../model/contact.model';
import {session} from '../session';


@Injectable()
export class ContactService {

  $filterSubject: Subject<ContactFilter>;
  $deletedContact: Subject<number>;
  $deleteContacts: Subject<string>;
  actionUrl: string;

  constructor(private dataService: DataService) {
    this.actionUrl = environment.apiUrl + '/contacts';
    this.$filterSubject = new Subject<ContactFilter>();
    this.$deletedContact = new Subject<number>();
    this.$deleteContacts = new Subject<string>();
  }

  getContacts(accountId: string) {
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    return this.dataService.getAll(params);
  }

  public getContact(id: number) {
    this.dataService.actionUrl = this.actionUrl;
    console.log('Getting contact: ' + id);
    const params = new Map<String, String>();
    params.set('userId', localStorage.getItem(session.userIdSession));
    return this.dataService.getSingle<Contact>(id, params);
  }

  deleteContact(id: number) {
    console.log('deleting contact', id);
    this.dataService.actionUrl = this.actionUrl;
    return this.dataService.delete<Contact>(id);
  }

  deleteContactList(result: number[]) {
    this.dataService.actionUrl = this.actionUrl;
    result.forEach(value => this.deleteContact(value).subscribe(
      value1 => console.log(value1),
      error1 => console.error(error1)
    ));
    this.$deletedContact.next(null);
  }

  createContact(contact: Contact, accountId, companyId, userId) {
    this.dataService.actionUrl = this.actionUrl;
    console.log('creating Contact', contact, accountId, companyId, userId);
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    params.set('companyId', companyId);
    params.set('userId', userId);
    return this.dataService.save<Contact>(contact, params);
  }
}

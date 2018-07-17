import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {Contact} from '../model/contact.model';
import {session} from '../session';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {ContactFilter} from '../contacts/contact-filter';
import {Subject} from 'rxjs/internal/Subject';


@Injectable()
export class ContactService {

  contacts: Observable<Contact[]>;
  private $contacts: BehaviorSubject<Contact[]>;
  $filterSubject: Subject<ContactFilter>;
  $deletedContact: Subject<string>;
  $deleteContactList: Subject<string>;

  private dataStore: {
    contacts: Contact[];
  };
  private actionUrl: string;

  constructor(private dataService: DataService) {
    this.actionUrl = environment.apiUrl + '/contacts';
    this.dataStore = {contacts: []};
    this.$contacts = <BehaviorSubject<Contact[]>>new BehaviorSubject([]);
    this.contacts = this.$contacts.asObservable();
    this.$filterSubject = new Subject<ContactFilter>();
    this.$deletedContact = new Subject<string>();
    this.$deleteContactList = new Subject<string>();
  }

  getContacts(accountId: string) {
    console.log('Getting all contacts');
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    this.dataService.getAll<Contact[]>(params).subscribe(
      data => {
        this.dataStore.contacts = data;
        this.$contacts.next(Object.assign({}, this.dataStore).contacts);
      }
    );
  }

  getContact(id: number) {
    console.log('Getting contact: ' + id);
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('userId', localStorage.getItem(session.userIdSession));
    this.dataService.getSingle<Contact>(id, params).subscribe(
      data => {
        let notFound = true;
        this.dataStore.contacts.forEach((item, index) => {
          if (item.id === data.id) {
            this.dataStore.contacts[index] = data;
            notFound = false;
          }
        });
        if (notFound) {
          this.dataStore.contacts.push(data);
        }
        this.$contacts.next(Object.assign({}, this.dataStore).contacts);
      }
    );
  }

  deleteContact(id: number) {
    console.log('deleting contact', id);
    this.deleteSingleContact(id);
    this.$deletedContact.next('');
  }

  deleteContactList(result: number[]) {
    result.forEach(
      value => this.deleteSingleContact(value)
    );
    this.$deletedContact.next('');
  }

  private deleteSingleContact(id: number) {
    this.dataService.actionUrl = this.actionUrl;
    this.dataService.delete<Contact>(id).subscribe(
      value => {
        this.dataStore.contacts.forEach((t, i) => {
          if (t.id === id) {
            this.dataStore.contacts.splice(i, 1);
          }
        });

        this.$contacts.next(Object.assign({}, this.dataStore).contacts);
      }
    );
  }

  createContact(contact: Contact, accountId, companyId, userId) {
    console.log('creating Contact', contact, accountId, companyId, userId);
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    params.set('companyId', companyId);
    params.set('userId', userId);
    this.dataService.save<Contact>(contact, params).subscribe(
      data => {
        this.dataStore.contacts.push(data);
        this.$contacts.next(Object.assign({}, this.dataStore).contacts);
      }
    );
  }
}

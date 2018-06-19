import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {Subject} from 'rxjs/internal/Subject';
import {ContactFilter} from '../contacts/contact-filter';
import {Contact} from '../model/contact.model';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()
export class ContactService {

  filterSubject: Subject<ContactFilter>;
  deletedContact: Subject<number>;
  actionUrl: string;

  constructor(private dataService: DataService) {
    this.actionUrl = environment.apiUrl + '/contacts';
    this.filterSubject = new Subject<ContactFilter>();
    this.deletedContact = new Subject<number>();
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
    params.set('userId', '1');
    return this.dataService.getSingle(id, params);
  }

  deleteContact(id: number) {
    console.log('deleting contact', id);
    this.dataService.actionUrl = this.actionUrl;
    return this.dataService.delete<Contact>(id);
  }
}

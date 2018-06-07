import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Subject} from 'rxjs/internal/Subject';
import {ContactFilter} from '../contacts/contact-filter';


@Injectable()
export class ContactService {

  filterSubject: Subject<ContactFilter>;
  actionUrl: string;

  constructor(private dataService: DataService) {
    this.actionUrl = environment.apiUrl + '/contacts';
    this.filterSubject = new Subject<ContactFilter>();
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
}

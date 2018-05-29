import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from '../data.service';
import {Subscription} from 'rxjs/internal/Subscription';


@Injectable()
export class ContactService {

  constructor(private dataService: DataService) {
    dataService.actionUrl = environment.apiUrl + '/contacts';
  }

  getContacts(accountId: string) {
    return this.dataService.getAll('accountId', accountId);
  }

  public getContact(id: number) {
    console.log('Getting contact: ' + id);
    const params = new Map<String, String>();
    params.set('userId', '1');
    return this.dataService.getSingle(id, params);
  }
}

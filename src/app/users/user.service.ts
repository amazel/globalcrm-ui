import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from '../services/data.service';

@Injectable()
export class UserService {

  constructor(private dataService: DataService) {
    dataService.actionUrl = environment.apiUrl + '/users';
  }

  public getUser(id: number) {
    console.log('Getting user: ' + id);
    return this.dataService.getSingle(id);
  }
}

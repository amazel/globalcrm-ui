import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {Company} from '../model/company.model';


@Injectable()
export class CompanyService {


  constructor(private dataService: DataService) {
    dataService.actionUrl = environment.apiUrl + '/companies';
  }

  public getCompanies(accountId: string) {
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    return this.dataService.getAll(params);
  }

  public getCompany(id: number) {
    console.log('Getting company: ' + id);
    return this.dataService.getSingle(id);
  }

  public createCompany(company: Company) {
    const params = new Map<String, String>();
    params.set('accountId', '1');
    return this.dataService.save(company, params);
  }
}

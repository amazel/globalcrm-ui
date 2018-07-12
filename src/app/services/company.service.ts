import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {Company} from '../model/company.model';


@Injectable()
export class CompanyService {

  actionUrl: string;

  constructor(private dataService: DataService) {
    this.actionUrl = environment.apiUrl + '/companies';
  }

  public getCompanies(accountId: string) {
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    return this.dataService.getAll<Company[]>(params);
  }

  public getCompany(id: number) {
    this.dataService.actionUrl = this.actionUrl;
    console.log('Getting company: ' + id);
    return this.dataService.getSingle(id);
  }

  public createCompany(company: Company, accountId) {
    console.log('Creating company', company, accountId);
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    return this.dataService.save<Company>(company, params);
  }
}

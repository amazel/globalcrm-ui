import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {Company} from '../model/company.model';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()
export class CompanyService {

  public companies: Observable<Company[]>;
  private _companies: BehaviorSubject<Company[]>;
  actionUrl: string;

  constructor(private dataService: DataService) {
    this.actionUrl = environment.apiUrl + '/companies';
    this._companies = <BehaviorSubject<Company[]>>new BehaviorSubject([]);
    this.companies = this._companies.asObservable();
  }

  getCompanies(accountId: string) {
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    return this.dataService.getAll<Company[]>(params);
  }

  getAllCompanies(accountId: string) {
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    this.dataService.getAll<Company[]>(params).subscribe(
      data => {
        this._companies.next(data);
      }
    );
  }

  getCompany(id: number) {
    this.dataService.actionUrl = this.actionUrl;
    console.log('Getting company: ' + id);
    return this.dataService.getSingle(id);
  }

  createCompany(company: Company, accountId) {
    console.log('Creating company', company, accountId);
    this.dataService.actionUrl = this.actionUrl;
    const params = new Map<String, String>();
    params.set('accountId', accountId);
    return this.dataService.save<Company>(company, params);
  }
}

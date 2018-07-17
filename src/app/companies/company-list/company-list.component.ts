import {Component, OnInit} from '@angular/core';
import {Company} from '../../model/company.model';
import {CompanyService} from '../../services/company.service';
import {Observable} from 'rxjs/internal/Observable';
import {session} from '../../session';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies:  Observable<Company[]>;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.companies = this.companyService.companies;
    this.companyService.getAllCompanies(localStorage.getItem(session.accountIdSession));
  }

}

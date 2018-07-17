import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list/company-list.component';
import {CompaniesComponent} from './companies.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRouterModule} from '../app-router.module';
import {CompanyService} from '../services/company.service';

@NgModule({
  imports: [
    AppRouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompaniesComponent,
    CompanyListComponent
  ],
  providers: [
    CompanyService
  ]
})
export class CompaniesModule { }

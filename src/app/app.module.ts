import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksComponent} from './tasks/tasks.component';
import {CompaniesComponent} from './companies/companies.component';
import {SalesComponent} from './sales/sales.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRouterModule} from './app-router.module';
import {AuthInterceptor} from './auth.interceptor';
import {AuthModule} from './auth/auth.module';
import {DataService} from './services/data.service';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {ProfileComponent} from './layout/header/profile/profile.component';
import {LayoutComponent} from './layout/layout.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompanyService} from './services/company.service';
import {ContactsModule} from './contacts/contacts.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    TasksComponent,
    CompaniesComponent,
    SalesComponent,
    SidebarComponent,
    ProfileComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsModule
  ],
  exports: [
    AppRouterModule,
  ],
  providers: [
    DataService,
    CompanyService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactListComponent} from './contacts/contact-list/contact-list.component';
import {ContactFilterComponent} from './contacts/contact-filter/contact-filter.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TasksComponent} from './tasks/tasks.component';
import {CompaniesComponent} from './companies/companies.component';
import {SalesComponent} from './sales/sales.component';
import {ContactDetailComponent} from './contacts/contact-detail/contact-detail.component';
import {ContactListItemComponent} from './contacts/contact-list/contact-list-item/contact-list-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRouterModule} from './app-router.module';
import {AuthInterceptor} from './auth.interceptor';
import {ContactService} from './contacts/contact.service';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './auth/auth.service';
import {DataService} from './data.service';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {ProfileComponent} from './layout/header/profile/profile.component';
import {LayoutComponent} from './layout/layout.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    TasksComponent,
    CompaniesComponent,
    SalesComponent,
    ContactsComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactDetailComponent,
    ContactListItemComponent,
    SidebarComponent,
    ProfileComponent,
    LayoutComponent,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    AuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    DataService,
    ContactService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

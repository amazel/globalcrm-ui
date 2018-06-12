import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {ContactListItemComponent} from './contact-list/contact-list-item/contact-list-item.component';
import {ContactFilterComponent} from './contact-filter/contact-filter.component';
import {ContactDetailComponent} from './contact-detail/contact-detail.component';
import {ContactsFilterPipe} from './contacts-filter.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContactService} from '../services/contact.service';
import {AppRouterModule} from '../app-router.module';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactDetailComponent,
    ContactListItemComponent,
    ContactsFilterPipe
  ],
  imports: [
    AppRouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContactService]
})
export class ContactsModule {
}

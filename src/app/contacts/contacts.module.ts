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
import {ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
import { ContactEditComponent } from './contact-edit/contact-edit.component';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactDetailComponent,
    ContactListItemComponent,
    ContactsFilterPipe,
    ContactEditComponent
  ],
  imports: [
    AppRouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [ContactService,
    ContactsFilterPipe]
})
export class ContactsModule {
}

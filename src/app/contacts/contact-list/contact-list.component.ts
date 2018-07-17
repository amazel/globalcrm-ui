import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../../services/contact.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {ContactFilter} from '../contact-filter';
import {PageChangedEvent} from 'ngx-bootstrap';
import {ContactsFilterPipe} from '../contacts-filter.pipe';
import {ContactListItemComponent} from './contact-list-item/contact-list-item.component';
import {session} from '../../session';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  @ViewChildren(ContactListItemComponent) contactItems: QueryList<ContactListItemComponent>;
  private subscription: Subscription;
  selectAllCB = false;
  currentPage;
  itemsXPage = 5;
  paginatedList: Contact[];
  $contacts: Observable<Contact[]>;
  contacts: Contact[];
  filteredContacts: Contact[];
  contactFilter: ContactFilter;
  isContactDeleted = false;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private filterPipe: ContactsFilterPipe) {
    this.subscription = new Subscription();
    this.currentPage = 1;
  }

  ngOnInit() {

    this.$contacts = this.contactService.contacts;
    this.contactService.getContacts(localStorage.getItem(session.accountIdSession));

    this.$contacts.subscribe(value => {
      this.contacts = value;
      this.filteredContacts = value;
      this.paginatedList = this.contacts.slice(0, this.itemsXPage);
      this.currentPage = 1;
    });

    this.subscription.add(
      this.contactService.$filterSubject.subscribe(
        (data: ContactFilter) => {
          this.contactFilter = data;
          if (this.contacts) {
            this.filteredContacts = this.filterPipe.transform(this.contacts.slice(), data);
            this.paginatedList = this.filteredContacts.slice(0, this.itemsXPage);
          }
          setTimeout(() => {
            this.currentPage = 1;
            this.selectAllChBx(false);
          });
        }
      ));
    this.subscription.add(
      this.contactService.$deletedContact.subscribe(
        id => {
          this.isContactDeleted = true;
          setTimeout(() => {
            this.isContactDeleted = false;
          }, 5000);
          setTimeout(() => {
            this.currentPage = 1;
            this.selectAllChBx(false);
          });
        }
      ));

    this.subscription.add(
      this.contactService.$deleteContactList.subscribe(
      value => {
        const result = this.contactItems
          .filter(item => item.selectedCB.value === true)
          .map(value1 => value1.contact.id);
        this.contactService.deleteContactList(result);
        // this.filteredContacts = this.contacts;
        // this.paginatedList = this.contacts.slice(0, this.itemsXPage);
        // setTimeout(() => {
        //   this.selectAllChBx(false);
        // });
      }
    ));
  }



  pageChanged(event: PageChangedEvent): void {
    this.selectAllCB = false;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedList = this.contacts.slice(startItem, endItem);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectAllChBx(newValue: boolean) {
    console.log('selectAllChBx', newValue);
    this.selectAllCB = newValue;
    this.contactItems.forEach(item => {
      item.checked = newValue;
    });
  }
}


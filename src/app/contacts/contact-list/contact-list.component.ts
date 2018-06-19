import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../../services/contact.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {ContactFilter} from '../contact-filter';
import {PageChangedEvent} from 'ngx-bootstrap';
import {ContactsFilterPipe} from '../contacts-filter.pipe';
import {ContactListItemComponent} from './contact-list-item/contact-list-item.component';

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
  contacts: Contact[];
  filteredContacts: Contact[];
  contactFilter: ContactFilter;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private filterPipe: ContactsFilterPipe) {
    this.subscription = new Subscription();
    this.currentPage = 1;
  }

  pageChanged(event: PageChangedEvent): void {
    this.selectAllCB = false;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedList = this.contacts.slice(startItem, endItem);
  }

  ngOnInit() {
    this.subscription.add(this.contactService.getContacts('1').subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        this.filteredContacts = data;
        this.paginatedList = this.contacts.slice(0, this.itemsXPage);
        console.log(this.contacts);
        this.currentPage = 1;
      },
      () => {
        console.log('ERROR');
      }
    ));

    this.subscription.add(this.contactService.filterSubject.subscribe(
      (data: ContactFilter) => {
        console.log('next filter', data);
        this.contactFilter = data;
        if (this.contacts) {
          this.filteredContacts = this.filterPipe.transform(this.contacts.slice(), data);
          this.paginatedList = this.filteredContacts.slice(0, this.itemsXPage);
        }
        setTimeout(() => {
          this.currentPage = 1;
        });
      }
    ));
    this.subscription.add(this.contactService.deletedContact.subscribe(
      id => {
        for (const [_i, contact] of this.contacts.entries()) {
          if (contact.id === id) {
            console.log('removing contact from array', id, 'index', _i);
            this.contacts.splice(_i, 1);
            this.filteredContacts = this.contacts;
            this.paginatedList = this.contacts.slice(0, this.itemsXPage);
            break;
          }
        }
        setTimeout(() => {
          this.currentPage = 1;
        });
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectAllChBx() {
    console.log(this.selectAllCB);
    this.selectAllCB = !this.selectAllCB;
    this.contactItems.forEach(item => {
      item.checked = this.selectAllCB;
    });
  }

}

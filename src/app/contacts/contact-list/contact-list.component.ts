import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {ContactFilter} from '../contact-filter';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  contacts: Contact[];
  contactFilter: ContactFilter;

  constructor(private contactService: ContactService, private route: ActivatedRoute) {
    this.subscription = new Subscription();
    this.subscription.add(this.contactService.filterSubject.subscribe(
      (data: ContactFilter) => this.contactFilter = data
    ));
  }

  ngOnInit() {
    this.subscription.add(this.contactService.getContacts('1').subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      () => {
        console.log('ERROR');
      },
      () => {
        console.log('COMPLETE! List size: ', this.contacts);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

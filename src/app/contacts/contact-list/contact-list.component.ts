import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  contacts: Contact[];

  constructor(private contactService: ContactService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.contactService.getContacts('1').subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      () => {
        console.log('ERROR');
      },
      () => {
        console.log('COMPLETE! List size: ', this.contacts);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

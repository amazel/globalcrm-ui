import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  providers: [ContactService]
})
export class ContactDetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  currentContact: Contact;
  id: number;

  constructor(private contactService: ContactService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription.add(this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.subscription.add(this.contactService.getContact(this.id)
              .subscribe(
            (data: Contact) => this.currentContact = data
          ));
        }
      ));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

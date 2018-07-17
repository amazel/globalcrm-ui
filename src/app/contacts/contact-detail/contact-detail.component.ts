import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../../services/contact.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  providers: [ContactService]
})
export class ContactDetailComponent implements OnInit, OnDestroy {

  private paramSubscription: Subscription;

  currentContact: Observable<Contact>;
  id: number;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.contactService.getContact(this.id);
          this.currentContact = this.contactService.contacts.pipe(
            map(contacts => contacts.find(item => item.id === this.id))
          );

        }
      );
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}

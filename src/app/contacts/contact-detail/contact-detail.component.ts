import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  providers: [ContactService]
})
export class ContactDetailComponent implements OnInit {

  currentContact: Contact;

  constructor(private contactService: ContactService, private route: ActivatedRoute) {
    console.log('Getting detail for contact: ' + this.route.snapshot.params['id']);
    this.contactService.getSingle(this.route.snapshot.params['id']).subscribe(
      (data: Contact) => {
        this.currentContact = data;
      }, error1 => () => {
        console.log('ERROR');
      },
      () => {
        console.log('COMPLETE!');
      }
    );
  }

  ngOnInit() {

  }

}

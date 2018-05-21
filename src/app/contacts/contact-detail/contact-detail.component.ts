import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {ContactService} from '../contact.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  providers: [ContactService]
})
export class ContactDetailComponent implements OnInit {

  currentContact: Contact;
  id: number;

  constructor(private contactService: ContactService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.contactService.getSingle(this.id).subscribe(
            (data: Contact) => this.currentContact = data
          )
          ;
        }
      );

  }

}

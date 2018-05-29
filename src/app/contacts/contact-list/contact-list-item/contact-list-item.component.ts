import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../model/contact.model';
import {ContactService} from '../../contact.service';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  onSelected() {
  }

}

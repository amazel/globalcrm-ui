import {Component, OnInit} from '@angular/core';
import {ContactFilter} from '../contact-filter';
import {ContactService} from '../contact.service';

declare var $: any;

@Component({
  selector: 'app-contacts-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})


export class ContactFilterComponent implements OnInit {

  filter: ContactFilter = new ContactFilter();

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.filterSubject.next(this.filter);
  }

  openModel() {
    $('#myModal').toggleClass('modal fade show');
  }

  closeModel() {
    $('#myModal').toggleClass('modal hide');
  }
}

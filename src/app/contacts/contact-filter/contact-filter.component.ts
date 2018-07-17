import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContactFilter} from '../contact-filter';
import {ContactService} from '../../services/contact.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../services/company.service';
import {PhoneType} from '../../model/phone-type.enum';
import {EmailType} from '../../model/email-type.enum';
import {Company} from '../../model/company.model';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/internal/Subscription';
import {session} from '../../session';
import {VisibleFor} from '../../model/visible-for.enum';
import {Contact} from '../../model/contact.model';
import {ContactType} from '../../model/contact-type.enum';

declare var $: any;

@Component({
  selector: 'app-contacts-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit, OnChanges {

  filter: ContactFilter = new ContactFilter();
  subscription: Subscription;
  createContactForm: FormGroup;
  companies: Company[];
  selectedOption: any;
  loading = false;
  submitted = false;

  constructor(private contactService: ContactService,
              private companyService: CompanyService,
              private fb: FormBuilder) {
    this.createForm(fb);
    this.subscription = new Subscription();
  }

  get f() {
    return this.createContactForm.controls;
  }

  ngOnInit() {
    this.contactService.$filterSubject.next(this.filter);
    this.subscription.add(
      this.companyService.getCompanies(localStorage.getItem(session.accountIdSession))
        .subscribe(
          data => this.companies = data
        ));
  }

  createForm(fb: FormBuilder) {
    this.createContactForm = fb.group({
      name: fb.control('', Validators.required),
      lastName: '',
      phoneArray: fb.array([fb.group({
          phone: fb.control(''),
          phoneType: fb.control(PhoneType[PhoneType.WORK])
        }
      )]),
      emailArray: fb.array([fb.group({
          email: fb.control(''),
          emailType: fb.control(EmailType[EmailType.WORK])
        }
      )]),
      company: fb.control('', Validators.required)
    });
  }

  createContact() {
    this.submitted = true;
    if (this.createContactForm.invalid) {
      return;
    }
    this.loading = true;
    const formModel = this.createContactForm.value;
    console.log(formModel.name);
    console.log(formModel.phoneArray);
    console.log(formModel.emailArray);
    console.log(formModel.company);
    console.log(this.selectedOption);

    const newContact = new Contact();
    newContact.emails = formModel.emailArray;
    newContact.lastNames = formModel.lastName;
    newContact.names = formModel.name;
    newContact.phones = formModel.phoneArray;
    newContact.contactType = ContactType.PROSPECT;
    newContact.visibleFor = VisibleFor[VisibleFor.ALL];

    if (!this.selectedOption) {
      const newCompany = new Company();
      newCompany.name = formModel.company;
      newCompany.visibleFor = VisibleFor[VisibleFor.ALL];
      this.companyService.createCompany(newCompany, localStorage.getItem(session.accountIdSession))
        .subscribe(value => {
          this.contactService.createContact(
            newContact,
            localStorage.getItem(session.accountIdSession),
            value.id,
            localStorage.getItem(session.userIdSession));
        });
    } else {
      this.contactService.createContact(
        newContact,
        localStorage.getItem(session.accountIdSession),
        this.selectedOption.id,
        localStorage.getItem(session.userIdSession));
    }
    // this.contactService.
    this.onModalClose();
    $('#myModal').modal('toggle');
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  onNoResult(event) {
    this.selectedOption = null;
  }

// Phones
  setPhones(phones: Phone[]) {
    const phonesFGs = phones.map(phone => this.fb.group({
      phone: phone.phone,
      phoneType: phone.phoneType
    }));
    const phonesFormArray = this.fb.array(phonesFGs);
    this.createContactForm.setControl('phoneArray', phonesFormArray);
  }

  addPhoneForm() {
    this.phoneArray.push(this.fb.group({
        phone: this.fb.control(''),
        phoneType: this.fb.control(PhoneType[PhoneType.WORK])
      }
    ));
  }

  get phoneArray(): FormArray {
    return this.createContactForm.get('phoneArray') as FormArray;
  }

  phoneTypeKeys(): Array<string> {
    const keys = Object.keys(PhoneType);
    return keys.slice(keys.length / 2);
  }

  removePhoneForm(index) {
    if (this.phoneArray.length > 1) {
      this.phoneArray.removeAt(index);
    }
  }

// - Phones

// Emails
  setEmails(emails: Email[]) {
    const emailsFGs = emails.map(email => this.fb.group({
      email: email.email,
      emailType: email.emailType
    }));
    const emailsFormArray = this.fb.array(emailsFGs);
    this.createContactForm.setControl('emailArray', emailsFormArray);
  }

  addEmailForm() {
    this.emailArray.push(this.fb.group({
        email: this.fb.control(''),
        emailType: this.fb.control(EmailType[EmailType.WORK])
      }
    ));
  }

  get emailArray(): FormArray {
    return this.createContactForm.get('emailArray') as FormArray;
  }

  emailTypeKeys(): Array<string> {
    const keys = Object.keys(EmailType);
    return keys.slice(keys.length / 2);
  }

  removeEmailForm(index) {
    if (this.emailArray.length > 1) {
      this.emailArray.removeAt(index);
    }

  }

// - Emails

  onModalClose() {
    this.createForm(this.fb);
    this.loading = false;
    this.submitted = false;
  }

// -Modal

  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildForm();
  }

  rebuildForm() {
    this.createContactForm.reset();
  }

  onSearchClick(event) {
    this.contactService.$filterSubject.next(this.filter);
  }

  deleteContactList() {
    this.contactService.$deleteContactList.next('');
  }
}

import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContactFilter} from '../contact-filter';
import {ContactService} from '../../services/contact.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CompanyService} from '../../services/company.service';
import {PhoneType} from '../../model/phone-type.enum';
import {EmailType} from '../../model/email-type.enum';

declare var $: any;

@Component({
  selector: 'app-contacts-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})


export class ContactFilterComponent implements OnInit, OnChanges {

  filter: ContactFilter = new ContactFilter();
  createContactForm: FormGroup;

  constructor(private contactService: ContactService,
              private companyService: CompanyService,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.contactService.filterSubject.next(this.filter);
  }

  createForm() {
    this.createContactForm = this.fb.group({
      name: '',
      lastName: '',
      phoneArray: this.fb.array([this.fb.group({
          phone: this.fb.control(''),
          phoneType: this.fb.control(PhoneType[PhoneType.WORK])
        }
      )]),
      emailArray: this.fb.array([this.fb.group({
          email: this.fb.control(''),
          emailType: this.fb.control(EmailType[EmailType.WORK])
        }
      )])
    });
  }

  createContact() {
    const formModel = this.createContactForm.value;
    console.log(formModel.name);
    console.log(formModel.phoneArray);
    console.log(formModel.emailArray);
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
    this.createForm();
  }

// -Modal

  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildForm();
  }

  rebuildForm() {
    this.createContactForm.reset();
  }
}

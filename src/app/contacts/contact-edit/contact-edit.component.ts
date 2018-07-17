import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {Contact} from '../../model/contact.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {ContactService} from '../../services/contact.service';
import {map, tap} from 'rxjs/operators';
import {EmailType} from '../../model/email-type.enum';
import {PhoneType} from '../../model/phone-type.enum';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {Company} from '../../model/company.model';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  currentContact: Observable<Contact>;
  private subscription: Subscription;
  updateContactForm: FormGroup;
  selectedOption: any;
  companies: Company[];
  loading = false;
  submitted = false;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.subscription = new Subscription();
    this.createForm(fb);
    this.loading = false;
    this.submitted = false;

    const c1: Company = new Company();
    c1.id = 3;
    c1.name = 'COMPANY A';

    const c2: Company = new Company();
    c2.id = 1;
    c2.name = 'DUMMY COMPANY';

    this.companies = [c1, c2];
  }

  createForm(fb: FormBuilder) {

    this.updateContactForm = fb.group({
      names: fb.control('', Validators.required),
      lastNames: fb.control(''),
      phones: fb.array(
        [fb.group({
          phone: fb.control(''),
          phoneType: fb.control(PhoneType[PhoneType.WORK])
        })
        ]),
      emails: fb.array([fb.group({
          email: fb.control(''),
          emailType: fb.control(EmailType[EmailType.WORK])
        }
      )]),
      company: fb.group({
        id: fb.control(''),
        name: fb.control('', Validators.required)
      })
    });
  }

  ngOnInit() {

    this.subscription.add(this.route.params
      .subscribe(
        (params: Params) => {
          const id = +params['id'];
          this.contactService.getContact(id);
          this.currentContact = this.contactService.contacts.pipe(
            map(contacts => contacts.find(item => item.id === id)),
            tap(
              x => {
                this.updateContactForm.patchValue(x);
                this.updateContactForm.controls['phones'] = this.fb.array(x.phones.map(i => this.fb.group(i)));
                this.updateContactForm.controls['emails'] = this.fb.array(x.emails.map(i => this.fb.group(i)));
              }
            )
          );
        }
      )
    );
  }

  get f() {
    return this.updateContactForm.controls;
  }

  get phones(): FormArray {
    return this.updateContactForm.get('phones') as FormArray;
  }

  phoneTypeKeys(): Array<string> {
    const keys = Object.keys(PhoneType);
    return keys.slice(keys.length / 2);
  }

  addPhoneFormControl() {
    this.phones.push(this.fb.group({
        phone: this.fb.control(''),
        phoneType: this.fb.control(PhoneType[PhoneType.WORK])
      }
    ));
  }

  removePhoneFormControl(index) {
    this.phones.removeAt(index);
  }


  get emails(): FormArray {
    return this.updateContactForm.get('emails') as FormArray;
  }

  emailTypeKeys(): Array<string> {
    const keys = Object.keys(EmailType);
    return keys.slice(keys.length / 2);
  }

  addEmailFormControl() {
    this.emails.push(this.fb.group({
        email: this.fb.control(''),
        emailType: this.fb.control(EmailType[EmailType.WORK])
      }
    ));
  }

  removeEmailFormControl(index) {
    this.emails.removeAt(index);
  }

  get company(): FormGroup {
    return this.updateContactForm.controls['company'] as FormGroup;
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  onNoResult(event) {
    this.selectedOption = null;
  }
}

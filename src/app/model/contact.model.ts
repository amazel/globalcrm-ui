import {User} from './user.model';
import {VisibleFor} from "./visible-for.enum";
import {PhoneType} from "./phone-type.enum";
import {EmailType} from "./email-type.enum";
import {Company} from "./company.model";

class ContactType {
}



class Sale {
}

export class Contact {
  public id: number;
  public names: string;
  public lastNames: string;
  public creationDateTime: Date;
  public createdBy: User;

  public contactType: ContactType;
  public phones: Map<PhoneType, string> = new Map();
  public emails: Map<EmailType, string> = new Map();
  public company: Company;
  public visibleFor: VisibleFor;
  public sales: Set<Sale>;


  public getPhones(): IterableIterator<string> {
    return this.phones.values();
  }
}

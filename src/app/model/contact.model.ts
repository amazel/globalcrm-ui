import {User} from './user.model';
import {VisibleFor} from './visible-for.enum';
import {Company} from './company.model';

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
  public phones: Phone[];
  public emails: Email[];
  public company: Company;
  public visibleFor: string;
  public sales: Set<Sale>;
}
